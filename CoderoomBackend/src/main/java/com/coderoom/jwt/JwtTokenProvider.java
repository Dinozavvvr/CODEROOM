package com.coderoom.jwt;

import com.coderoom.security.details.LoginServiceImpl;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

/**
 * created: 02-04-2021 - 18:58
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Component
public class JwtTokenProvider {

    private final static String AUTHORITIES_KEY = "authorities";

    private final static Long TOKEN_VALID_TIME = 60 * 60 * 24 * 90L;

    @Value("{jwt.secretKey}")
    private String secretKey;

    private final LoginServiceImpl loginService;

    public JwtTokenProvider(LoginServiceImpl loginService) {
        this.loginService = loginService;
    }

    @PostConstruct
    public void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public boolean validate(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey).parseClaimsJws(token);

            Date expirationDate = claims.getBody().getExpiration();
            return expirationDate.after(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String generateToken(String nickname, String role) {
        /* payloads - полезные нагрузки */
        Claims claims = Jwts.claims().setSubject(nickname);
        claims.put("role", role);

        Date date = new Date();
        long expire = date.getTime();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(nickname)
                .setExpiration(new Date(expire))
                .setIssuedAt(date)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String generateToken(Authentication authentication) {
        final String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .setSubject(authentication.getName())                       // putting nickname
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALID_TIME * 1000))
                .compact();
    }

    public Authentication getAuthentication(String token) {
        String nickname = Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        UserDetails user = loginService.loadUserByUsername(nickname);
        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }

}

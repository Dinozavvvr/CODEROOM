package com.coderoom.filters;

import com.coderoom.jwt.JwtTokenProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * created: 02-04-2021 - 19:07
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
@Component
public class JwtFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (jwtTokenProvider.validate(token)) {
            SecurityContextHolder.getContext().setAuthentication(
                    jwtTokenProvider.getAuthentication(token)
            );
        } else {
            SecurityContextHolder.clearContext();
        }
        chain.doFilter(request, response);
    }
}


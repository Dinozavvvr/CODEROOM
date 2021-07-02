package com.coderoom.interceptors;

import com.coderoom.dto.user.UserDto;
import com.coderoom.security.details.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * created: 08-05-2021 - 11:14
 * project: coderoom-backend
 *
 * @author dinar
 * @version v0.1
 */
public class UpdateAndDeleteWorkspaceInterceptor implements HandlerInterceptor {

    private final List<String> paths = new ArrayList<>();

    {
        paths.add("/api/v.1/workspace/delete");
        paths.add("/api/v.1/workspace/update");
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {
        String requestPath = request.getRequestURI();
        System.out.println(requestPath);
        if (paths.contains(requestPath)) {
            UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getDetails();
            return true;
        }
        return false;
    }
}

package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.security.AppUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

//    @GetMapping("/me")
//    public String getMe(@AuthenticationPrincipal OAuth2User user) {
//        return user.getAttributes().get("login").toString();
//    }

    @GetMapping("/me")
    public AppUser getMe(@AuthenticationPrincipal OAuth2User user) {
        return new AppUser(
                user.getName(),
                user.getAttributes().get("login").toString(),
                user.getAttributes().get("avatar_url").toString(),
                user.getAuthorities().iterator().next().getAuthority()
        );
    }
}

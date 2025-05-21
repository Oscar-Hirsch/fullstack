package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository appUserRepository;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        AppUser appUser = appUserRepository.findById(oAuth2User.getName())
                .orElseGet(() -> createAppUser(oAuth2User));

        return new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(appUser.role())), oAuth2User.getAttributes(), "id");
    }

    private AppUser createAppUser(OAuth2User oAuth2User) {
        AppUser newUser = AppUser.builder()
                .id(oAuth2User.getName())
                .username(oAuth2User.getAttributes().get("login").toString())
                .avatarUrl(oAuth2User.getAttributes().get("avatar_url").toString())
                .role("USER")
                .build();

        appUserRepository.save(newUser);
        return newUser;
    }
}

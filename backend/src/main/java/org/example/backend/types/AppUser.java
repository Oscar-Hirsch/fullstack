package org.example.backend.types;

import lombok.Builder;

@Builder
public record AppUser (String id, String username, String role){}

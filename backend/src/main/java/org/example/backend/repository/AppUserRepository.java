package org.example.backend.repository;

import org.example.backend.types.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppUserRepository extends MongoRepository<AppUser, String> {
}

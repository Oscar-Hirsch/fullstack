package org.example.backend.repository;

import org.example.backend.types.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
    Book getByIsbn( String isbn );
    
    void removeBookByIsbn( String isbn );
}

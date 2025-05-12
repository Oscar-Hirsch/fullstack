package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.BookRepository;
import org.example.backend.types.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

}

package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.service.BookService;
import org.example.backend.types.Book;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Controller {

    private final BookService bookService;

    @GetMapping("/")
    public List<Book> getAll() {
        return bookService.getAll();
    }
}

package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.service.BookService;
import org.example.backend.types.Book;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class Controller {
    
    private final BookService bookService;
    
    @GetMapping
    public List<Book> getAll() {
        return bookService.getAll();
    }
    
    @GetMapping("/{isbn}")
    public Book getByISBN( @PathVariable String isbn ) {
        return bookService.getByISBN( isbn );
    }
    
    @PostMapping("/newBook")
    public Book addBook( @RequestBody Book book ) {
        return bookService.addBook( book );
    }
    
    @PutMapping("/{isbn}")
    public Book updateBook( @PathVariable String isbn, @RequestBody Book book ) {
        return bookService.updateBook( isbn, book );
    }
    
    @DeleteMapping("/{isbn}")
    public void deleteBook( @PathVariable String isbn ) {
        bookService.deleteBook( isbn );
    }
}

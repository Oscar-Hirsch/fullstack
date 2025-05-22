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
    
    public Book getByISBN( String isbn ) {
        return bookRepository.getByIsbn( isbn );
    }
    
    public Book addBook( Book book ) {
        return bookRepository.save( book );
    }
    
    public Book updateBook( String isbn, Book book ) {
        Book foundBook = bookRepository.getByIsbn( isbn );
        return bookRepository.save( foundBook
                .withAuthor( book.author() )
                .withImage( book.image() )
                .withTitle( book.title() )
                .withSummary( book.summary() )
                .withTotalAmount( book.totalAmount() )
                .withTotalBookedAmount( book.totalBookedAmount() ) );
    }
    
    public void deleteBook( String isbn ) {
        bookRepository.removeBookByIsbn( isbn );
    }
}

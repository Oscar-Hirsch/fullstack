package org.example.backend.service;

import org.example.backend.repository.BookRepository;
import org.example.backend.types.Book;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BookServiceTest {
    
    private final BookRepository mockBookRepository = Mockito.mock( BookRepository.class );
    private final BookService mockBookService = new BookService( mockBookRepository );
    
    @Test
    void getAll() {
        //GIVEN
        Book firstBook = new Book( "Dark", "John", "9342393", "lorem ipsum", "somthing.jpeg", 8, 2 );
        Book secondBook = new Book( "Light", "John", "9342393", "lorem ipsum", "somthing.jpeg", 8, 2 );
        List<Book> BookList = List.of( firstBook, secondBook );
        
        //WHEN
        Mockito.when( mockBookRepository.findAll() ).thenReturn( BookList );
        
        //THEN
        List<Book> returnedBooks = mockBookService.getAll();
        assertEquals( BookList, returnedBooks );
    }
    
    @Test
    void getByISBN() {
        //GIVEN
        Book book = new Book( "Dark", "John", "9342393", "lorem ipsum", "somthing.jpeg", 8, 2 );
        
        //WHEN
        Mockito.when( mockBookRepository.getByIsbn( "9342393" ) ).thenReturn( book );
        
        //THEN
        Book returnedBook = mockBookService.getByISBN( "9342393" );
        assertEquals( book, returnedBook );
    }
    
    @Test
    void addBook() {
        //GIVEN
        Book book = new Book( "Dark", "John", "9342393", "lorem ipsum", "somthing.jpeg", 8, 2 );
        
        //WHEN
        mockBookService.addBook( book );
        
        //THEN
        Mockito.verify( mockBookRepository ).save( book );
    }
    
    @Test
    void updateBook() {
        //GIVEN
        Book book = new Book( "Dark", "John", "9342393", "lorem ipsum", "somthing.jpeg", 8, 2 );
        Book updatedBook = new Book( "Darkest", "John", "9342393", "lorem ipsum", "somthing.jpeg", 8, 2 );
        
        //WHEN
        Mockito.when( mockBookRepository.getByIsbn( "9342393" ) ).thenReturn( book );
        mockBookService.updateBook( "9342393", updatedBook );
        
        //THEN
        Mockito.verify( mockBookRepository ).save( updatedBook );
        Mockito.verify( mockBookRepository ).getByIsbn( "9342393" );
    }
    
    @Test
    void deleteBook() {
        mockBookService.deleteBook( "9342393" );
        Mockito.verify( mockBookRepository ).removeBookByIsbn( "9342393" );
    }
}
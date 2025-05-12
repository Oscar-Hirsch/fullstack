package org.example.backend.service;
import org.example.backend.repository.BookRepository;
import org.example.backend.types.Book;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

class BookServiceTest {

    private final BookRepository mockBookRepository = Mockito.mock(BookRepository.class);
    private final BookService mockBookService = new BookService(mockBookRepository);


    @Test
    void getAll() {
        //GIVEN
        Book firstBook = new Book("Dark", "John", 9342393, "lorem ipsum", "somthing.jpeg", 8, 2);
        Book secondBook = new Book("Light", "John", 9342393, "lorem ipsum", "somthing.jpeg", 8, 2);
        List<Book> BookList = List.of(firstBook, secondBook);

        //WHEN
        Mockito.when(mockBookRepository.findAll()).thenReturn(BookList);

        //THEN
        List<Book> returnedBooks = mockBookService.getAll();
        assertEquals(BookList, returnedBooks);
    }
}
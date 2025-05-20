package org.example.backend.controller;

import org.example.backend.repository.BookRepository;
import org.example.backend.types.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
@SpringBootTest
@AutoConfigureMockMvc
class ControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    BookRepository bookRepository;

    @Test
    void getAll() throws Exception {

        //WHEN
        bookRepository.save(new Book("book1", "author1", 123, "summary", "imageurl", 3, 5));


        //THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                """
                [{
                          "title": "book1",
                          "author": "author1",
                          "isbn": 123,
                          "summary": "summary",
                          "image": "imageurl",
                          "totalAmount": 3,
                          "totalBookedAmount": 5
                          }
                ]
                """
                ));
    }

    @Test
    void getByISBN() throws Exception {
        bookRepository.save(new Book("book1", "author1", 123, "summary", "imageurl", 3, 5));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/123"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
        """
        {
                          "title": "book1",
                          "author": "author1",
                          "isbn": 123,
                          "summary": "summary",
                          "image": "imageurl",
                          "totalAmount": 3,
                          "totalBookedAmount": 5
                          }
        """));

    }

    @Test @WithMockUser
    void addBook() throws Exception {
        //Given
        mockMvc.perform(MockMvcRequestBuilders.post("/api/newBook")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
            """
            {
                          "title": "book1",
                          "author": "author1",
                          "isbn": 123,
                          "summary": "summary",
                          "image": "imageurl",
                          "totalAmount": 3,
                          "totalBookedAmount": 5
                          }
            
            """))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
            {
                          "title": "book1",
                          "author": "author1",
                          "isbn": 123,
                          "summary": "summary",
                          "image": "imageurl",
                          "totalAmount": 3,
                          "totalBookedAmount": 5
                          }
"""));

    }

    @Test @WithMockUser
    void updateBook() throws Exception {
        bookRepository.save(new Book("book1", "author1", 123, "summary", "imageurl", 3, 5));
        mockMvc.perform(MockMvcRequestBuilders.put("/api/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                        {
                          "title": "book300",
                          "author": "author0",
                          "isbn": 123,
                          "summary": "summary",
                          "image": "imageurl",
                          "totalAmount": 3,
                          "totalBookedAmount": 5
                          }
            """))
        .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
            {
              "title": "book300",
              "author": "author0",
              "isbn": 123,
              "summary": "summary",
              "image": "imageurl",
              "totalAmount": 3,
              "totalBookedAmount": 5
              }"""));
    }

    @Test @WithMockUser
    void deleteBook() throws Exception {
        bookRepository.save(new Book("book1", "author1", 123, "summary", "imageurl", 3, 5));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/123"))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }
}
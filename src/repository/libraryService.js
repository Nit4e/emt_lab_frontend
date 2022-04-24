import axios from '../custom-axios/axios';

const libraryService = {
  fetchBooks: () => {
    return axios.get('/books');
  },

  deleteBook: (id) => {
    return axios.delete(`/books/${id}`);
  },

  fetchAuthors: () => {
    return axios.get('/authors');
  },

  addBook: (name, category, availableCopies, author) => {
    return axios.post('/books', {
      "name": name,
      "category": category,
      "availableCopies": availableCopies,
      "author": author
    });
  },

  getBook: (id) => {
    return axios.get(`/books/${id}`);
  },

  editProduct: (id, name, category, availableCopies, author) => {
    return axios.put(`/books/${id}`, {
      "name": name,
      "category": category,
      "availableCopies": availableCopies,
      "author": author
    });
  },

  markAsTaken: (id) => {
    return axios.patch(`/books/${id}/take`);
  }
}

export default libraryService;
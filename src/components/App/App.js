import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import libraryService from '../../repository/libraryService';
import Books from '../Books/Books'
import AddBook from '../Books/AddBook'
import EditBook from '../Books/EditBook';
import Categories from '../Categories/Categories'
import Authors from "../Authors/Authors";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      selectedBook: {}
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <main>
          <div className="container">
            <Route path={"/books/add"} exact render={() =>
                <AddBook authors={this.state.authors} onAddBook={this.addBook} />} />
            <Route path={"/books/edit/:id"} exact render={() =>
                <EditBook book={this.state.selectedBook} authors={this.state.authors}
                          onEditBook={this.editBook} />} />
            <Route path={"/books"} exact render={() =>
                <Books books={this.state.books}
                       onDelete={this.deleteBook}
                       onEdit={this.getBook}
                       markAsTaken={this.markAsTaken} />} />
            <Route path={"/categories"} exact render={() => <Categories />} />
            <Route path={"/"} exact render={() =>
                <Books books={this.state.books}
                       onDelete={this.deleteBook}
                       onEdit={this.getBook} />} />
            <Route path={"/authors"} exact render={() =>
                <Authors authors={this.state.authors}/>}/>
          </div>
        </main>
      </Router>
    );
  }

  componentDidMount() {
    this.loadBooks();
    this.loadAuthors();
  }

  loadBooks = () => {
    libraryService.fetchBooks()
      .then((data) => {
        this.setState({
          books: data.data
        })
      });
  }

  loadAuthors = () => {
    libraryService.fetchAuthors()
      .then((data) => {
        this.setState({
          authors: data.data
        })
      });
  }

  deleteBook = (id) => {
    libraryService.deleteBook(id)
      .then(() => {
        this.loadBooks();
      });
  }

  addBook = (name, category, availableCopies, author) => {
    libraryService.addBook(name, category, availableCopies, author)
      .then(() => {
        this.loadBooks();
      })
  }

  getBook = (id) => {
    libraryService.getBook(id)
      .then((data) => {
        this.setState({
          selectedBook: data.data
        })
      })
  }

  editBook = (id, name, category, availableCopies, author) => {
    libraryService.editProduct(id, name, category, availableCopies, author)
      .then(() => {
        this.loadBooks();
      })
  }

  markAsTaken = (id) => {
    libraryService.markAsTaken(id).then(() => {
      this.loadBooks();
    })
  }

}

export default App;

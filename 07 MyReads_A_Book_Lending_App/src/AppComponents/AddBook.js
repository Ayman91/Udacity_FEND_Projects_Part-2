import { Link } from 'react-router-dom';
import React, { Component } from 'react';
function AddBook (props) {
        return (
            <div className="open-search">
              <Link
                    to='/Search'
                    >Add a book
              </Link>
            </div>
         );
    };

export default AddBook;
import React from "react";
import ReactDOM from "react-dom";

var destination = document.querySelector("#container");

    var TodoList = React.createClass({
      getInitialState: function() {
        return {
          items: []
        };
      },
      addItem: function(e) {
        var itemArray = this.state.items;

          e.preventDefault();
        if(this._inputElement.value === "") {
          return alert("Please enter a task.");
        }

        itemArray.push(
          {
            text: this._inputElement.value,
            key: Date.now()
          }
        );

        this.setState({
          items: itemArray
        });

        this._inputElement.value = "";
      },
      removeItem: function(item) {
        const newState = this.state.items;
      	if (newState.indexOf(item) > -1) {
        	newState.splice(newState.indexOf(item), 1);
          this.setState({items: newState})
        }
      },
      render: function() {
          return (
            <div className="todoListMain">
              <div className="header">
                <form onSubmit={this.addItem}>
                  <input ref={(a) => this._inputElement = a}
                    placeholder="enter task">
                  </input>
                  <button type="submit">add</button>
                </form>
              </div>
              <TodoItems entries={this.state.items} remove={this.removeItem} />
            </div>
          );
        }
    });

    var TodoItems = React.createClass({
      getInitialState: function() {
        return {
          items: []
        };
      },
      render: function() {
        var todoEntries = this.props.entries, self = this;
        console.log("thist", this);

        function createTasks(item) {
          console.log(this);
          return (<div key={item.key}><li key={item.key}>{item.text}</li><button id="removeButton" onClick={self.props.remove.bind(null, item)}>Done</button></div>);
        }

        var listItems = todoEntries.map(createTasks);
        return (
          <ul className="theList">
            {listItems}
          </ul>
        );
      }
    });

    ReactDOM.render(
      <div>
        <TodoList/>
      </div>,
      destination
    );

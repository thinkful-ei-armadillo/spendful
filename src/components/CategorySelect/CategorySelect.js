import React from 'react';
import * as CategoriesService from '../../services/categories-service';

class CategorySelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      // showCreateForm: false,
    };

    this.createOptions = this.createOptions.bind(this);
    // this.handleCategoryChange = this.handleCategoryChange.bind(this);
    // this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
  }

  componentDidMount() {
    CategoriesService
      .getAllCategories()
      .then(categories => {
        this.setState({ categories });
      })
  }

  createOptions() {

    const filtered = this.state.categories.filter((c) => {
      return c.type === this.props.type
    })

    const options = filtered.map((o, i) => {
      return <option key={i} value={o.id}>{o.name}</option>
    });

    return options;
  }

  // handleCategoryChange(ev) {

  //   if (ev.target.value === 'create') {
  //     this.setState({showCreateForm: true});
  //   }
  // }

  // handleCreateFormSubmit(ev) {

  //   CategoriesService
  //     .createCategory({
  //       name: ev.target.newCategoryName.value,
  //       type: this.props.type,
  //     })
  //     .then((category) => {
  //       // could be better
  //       this.setState({ categories: [ ...this.state.categories, category ] })
  //     })
  //     .catch(console.log);
  // }

  render() {

    // let createForm = null;

    // if (this.state.showCreateForm) {
    //   createForm = (
    //     <form onSubmit={this.handleCreateFormSubmit}>
    //       <input type="text" id="newCategoryName" name="newCategoryName"></input>
    //       <button type="submit">Create</button>
    //       <button type="button">Cancel</button>
    //     </form>
    //   );
    // }

    return (
      <select id="category" name="category">
        <option value=''></option>
        {this.createOptions()}
        {/* <option value='create'>Create new category...</option> */}
      </select>
    );
  }
}

export default CategorySelect;

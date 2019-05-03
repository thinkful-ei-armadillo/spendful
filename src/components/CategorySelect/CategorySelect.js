import React from 'react';
import * as CategoriesService from '../../services/categories-service';

class CategorySelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      showCreateForm: false,
      inputValue: '',
      setCategory:'',
      errors: [],
    };

    this.createOptions = this.createOptions.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setCategories()
  }

  setCategories = () => {
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

  handleCategoryChange(ev) {
    this.setState({
      setCategory: ev.target.value,
      errors: [],
    })
    if (ev.target.value === 'create') {
      this.setState({
        showCreateForm: true,
        errors: [],
      });
    }
  }

  handleCreateFormSubmit() {

    this.setState({ errors: [] });

    CategoriesService
      .createCategory({
        name: this.state.inputValue,
        type: this.props.type,
      })
      .then((resJson) => {
        this.setNewCategory(resJson.id)
        this.clearInputValue()
        this.toggleShowCreate()
      })
      .then(() => {
        this.setCategories();
      })
      .catch(err => {
        this.setState({errors: [err.errors]});
      });
  }

  handleDeleteCategory = (id) => {
    try{
      if (!id){
        throw new Error('No category selected to delete')
      }
      CategoriesService
        .deleteCategory(id)
      .then(() => {
        let updatedCategories = this.state.categories.filter(category => category.id !== id)
        this.setState({
          categories: updatedCategories
        })
      })
    }
      catch(error){
        if (error.errors) {
          this.setState({errors: error.errors});
        }
        else if (error.message) {
          this.setState({errors: [error.message]});
        }
        else {
          this.setState({errors: error});
        }
      }
    }

  updateInputValue = (ev) => {
    this.setState({
      inputValue: ev.target.value
    })
  }

  clearInputValue = () => {
    this.setState({
      inputValue: ''
    })
  }

  toggleShowCreate = (cancel) => {
    if (cancel) {
      this.setState({
        setCategory: ''
      })
    }
    this.setState({
      showCreateForm: !this.state.showCreateForm
    })
  }

  setNewCategory = (newCat) => {
    this.setState({
      setCategory: newCat
    })
  }


  renderCreateCategory = () => {
    return (
        <div>
          <input value={this.state.inputValue} onChange={this.updateInputValue} type="text" id="newCategoryName" name="newCategoryName"></input>
          <button onClick={this.handleCreateFormSubmit} type="button">Create</button>
          <button onClick={() => this.toggleShowCreate('cancel')} type="button">Cancel</button>
        </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.errors ? <div className="alert-error">{this.state.errors}</div> : ''}

        {!this.state.showCreateForm
          ? <div>
            <select value={this.state.setCategory} onChange={this.handleCategoryChange} id="category" name="category" {...this.props}>
              <option value=''></option>
              {this.createOptions()}
              <option value='create'>Create new category...</option>
            </select>
            <button onClick={() => {this.handleDeleteCategory(this.state.setCategory)}} type="button">Delete This Category</button>
            </div>
          : this.renderCreateCategory()}
      </div>
    );
  }
}

export default CategorySelect;

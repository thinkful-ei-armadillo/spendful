import React from 'react';
import * as CategoriesService from '../../services/categories-service';
import DataContext from '../../contexts/DataContext';

class CategorySelect extends React.Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      showCreateForm: false,
      inputValue: '',
      setCategory:'',
    };
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

  createOptions = () => {
    const filtered = this.state.categories.filter((c) => {
      return c.type === this.props.type
    })

    const options = filtered.map((o, i) => {
      return <option key={i} value={o.id}>{o.name}</option>
    });

    return options;
  }

  handleCategoryChange = (ev) => {
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

  handleCreateFormSubmit = () => {
    this.context.clearError();

    if(! ['income', 'expense'].includes(this.props.type)) {
      this.context.setError(['Error creating category. Try again.'])
      return
    }

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
        this.context.setError(['Error creating category. Try again.']);
      });
  }

  handleDeleteCategory = (id) => {
    this.context.clearError();

    if(! id) {
      this.context.setError(['No category selected to delete'])
      return
    }

    CategoriesService
      .deleteCategory(id)
      .then(() => {
        this.setCategories();
      })
      .catch(err => {
        this.context.setError(err.errors);        
      })

    // try{
    //   if (!id){
    //     throw new Error('No category selected to delete')
    //   }
    //   CategoriesService
    //   .deleteCategory(id)
    //   .then(() => {
    //     this.setCategories();
    //   })
    //   .catch(err => {
    //     this.context.setError(err.errors);        
    //   })
    // }
    //   catch(error){
    //     console.log('ERROR', error)

    //     if (error.errors) {
    //       this.setState({errors: error.errors});
    //     }
    //     else if (error.message) {
    //       this.setState({errors: [error.message]});
    //     }
    //     else {
    //       this.setState({errors: error});
    //     }
    //   }
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
        setCategory: '',
        inputValue:'',
        errors:[]
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

  render() {
    let jsx = <>
      <select required value={this.state.setCategory} onChange={this.handleCategoryChange} id="category" className="form-control" name="category" {...this.props}>
        <option value=''>Please select a category...</option>
        {this.createOptions()}
        <option value='create'>Create new category...</option>
      </select>

      <button onClick={() => {this.handleDeleteCategory(this.state.setCategory)}} type="button" className="btn">
        <i className="fas fa-trash"></i>
      </button>
    </>;

    if(this.state.showCreateForm) {
      jsx = <>
        <input 
          value={this.state.inputValue} 
          onChange={this.updateInputValue} 
          type="text" 
          id="newCategoryName" 
          name="newCategoryName" 
          className="form-control"
          placeholder="Enter a new category name..."
          required />

        <button onClick={this.handleCreateFormSubmit} type="button" className="btn"><i className="fas fa-check"></i></button>
        <button onClick={() => this.toggleShowCreate('cancel')} type="button" className="btn"><i className="fas fa-window-close"></i></button>
      </>;
    }

    return <>
      <div className="form-row">{jsx}</div>
    </>;
  }
}

export default CategorySelect;

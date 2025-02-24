/**
 * Example of how to use Downshift to create a multi-select
 * that uses Styled Components.
 *
 * Based on this sandbox by Kent C. Dodds:
 * https://codesandbox.io/s/0p21okv38p
 */

import React from 'react'
import Downshift from 'downshift'
import { matchSorter } from 'match-sorter'



const ArrowIcon = ({isOpen}) => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="none"
    width={16}
    fill="transparent"
    stroke="#979797"
    strokeWidth="1.1px"
    transform={isOpen ? 'rotate(180)' : null}
  >
    <path d="M1,6 L10,15 L19,6" />
  </svg>
)



class MultiDownshift extends React.Component {
	constructor(props) {
	    super(props)
	}



	state = {selectedItems: []}

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const {onSelect, onChange} = this.props
      const {selectedItems} = this.state
      if (onSelect) {
        onSelect(selectedItems, this.getStateAndHelpers(downshift))
      }
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift))
      }
    }
    if (this.state.selectedItems.includes(selectedItem)) {
      this.removeItem(selectedItem, callOnChange)
    } else {
      this.addSelectedItem(selectedItem, callOnChange)
    }
  }

  removeItem = (item, cb) => {
    this.setState(({selectedItems}) => {
      return {
        selectedItems: selectedItems.filter(i => i !== item),
      }
    }, cb)
  }
  addSelectedItem(item, cb) {
    this.setState(
      ({selectedItems}) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb,
    )
  }

  getRemoveButtonProps = ({onClick, item, ...props} = {}) => {
    return {
      onClick: e => {
        // TODO: use something like downshift's composeEventHandlers utility instead
        onClick && onClick(e)
        e.stopPropagation()
        this.removeItem(item)
      },
      ...props,
    }
  }

  getStateAndHelpers(downshift) {
    const {selectedItems} = this.state
    const {getRemoveButtonProps, removeItem} = this
    return {
      getRemoveButtonProps,
      removeItem,
      selectedItems,
      ...downshift,
    }
  }
  render() {
    const {render, children = render, ...props} = this.props
    // TODO: compose together props (rather than overwriting them) like downshift does
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        selectedItem={null}
        itemToString={choices => (choices ? choices.name : '')}

      >
      {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    )
  }
}






class MultiDropdownApp extends React.Component {


	constructor(props) {
	    super(props)
	    this.choices=[]
	    this.getItems = this.getItems.bind(this)
        // this.onChange = this.onChange.bind(this)
	    this.handleChange = this.props.handleChange.bind(this)
	}


  componentDidMount(){
    this.props.choices.forEach((x) => {
      // if(this.props.tag==="Dataset"){
        // this.choices.push({name: x.split("/")[8]}) //this breaks the normal way we query FYI. 
      // }
      // else{
        this.choices.push({name: x})
      // }
    })
	console.log(this.choices)
  }

  input = React.createRef()
  itemToString = item => (item ? item.name : '')

  // onChange = selectedItems => {
  // 	// var changedItems = selectedItems.forEach(item => { item.name})
  //   // this.handleChange([this.props.tag, changedItems])
  // }


 getItems = filter => {
	  return filter
	    ? matchSorter(this.choices, filter, {
	        keys: ['name'],
	      })
	    : this.choices
	}


  render() {

    return (
      <div>
        <div style={{textAlign: 'center'}}>Select  {this.props.tag}</div>
        <MultiDownshift
          onChange={this.handleChange}
          itemToString={this.itemToString}
        >
          {({
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            // note that the getRemoveButtonProps prop getter and the removeItem
            // action are coming from MultiDownshift composibility for the win!
            getRemoveButtonProps,
            removeItem,

            isOpen,
            inputValue,
            selectedItems,
            getItemProps,
            highlightedIndex,
            toggleMenu,
          }) => (
            <div style={{width: 750, margin: 'auto', position: 'relative'}}>
              <div 	style={{cursor: "pointer",position: "relative",borderRadius: 6}}
	                onClick={() => {
                  		toggleMenu()
                  		!isOpen && this.input.current.focus()
                	}}>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                  {selectedItems.length > 0 &&
                    selectedItems.map(item => (
                      <div style={{
                      	margin: 2, 
                      	paddingTop: 2, 
                      	paddingBottom: 2, 
                      	paddingLeft: 8, 
                      	paddingRight: 8,
                      	display: "inline-block",
                      	wordWrap: "none",}}
                      	key={item.id}>

                        <div style={{
                        	display: "grid",
                        	gridGap: 6,
                        	gridAutoFlow: "column",
                        	alignItems: "center"}}>
                          <span id={`${this.props.tag}Selected`}>{item.name}</span>

                          <button {...getRemoveButtonProps({item})}>X</button>
                        </div>
                      </div>
                    ))}
                  <div
                    {...getInputProps({
                      ref: this.input,
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                    })}
                    placeholder={
                      selectedItems.length < 1 ? 'Select a value' : ''
                    }
                  />
                  </div>
                <div
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </div>
              </div>
              <div {...getMenuProps({isOpen})}>
                {isOpen
                  ? this.getItems(inputValue).map((item, index) => (
                      <div
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItems.includes(item),
                        })}
                      >
                        {item.name}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          )}
        </MultiDownshift>
      </div>
    )
  }
}

export { ArrowIcon, MultiDownshift, MultiDropdownApp}

// export default MultiDropdownApp

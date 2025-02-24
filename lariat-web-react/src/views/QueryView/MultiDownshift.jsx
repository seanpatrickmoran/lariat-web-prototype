// import React from 'react'
// import Downshift from 'downshift'


// export default class MultiDownshift extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       selectedItems: [],
//     }
//     this.choices = [...this.props.initialChoices];
//   }

//   stateReducer = (state, changes) => {
//     switch (changes.type) {
//       case Downshift.stateChangeTypes.keyDownEnter:
//       case Downshift.stateChangeTypes.clickItem:
//         return {
//           ...changes,
//           highlightedIndex: state.highlightedIndex,
//           isOpen: true,
//           inputValue: '',
//         }
//       default:
//         return changes
//     }
//   }

//   handleSelection = (selectedItem, downshift) => {
//     const callOnChange = () => {
//       const {onSelect, onChange} = this.props
//       const {selectedItems} = this.state
//       if (onSelect) {
//         onSelect(selectedItems, this.getStateAndHelpers(downshift))
//       }
//       if (onChange) {
//         onChange(selectedItems, this.getStateAndHelpers(downshift))
//       }
//     }
//     if (this.state.selectedItems.includes(selectedItem)) {
//       this.removeItem(selectedItem, callOnChange)
//     } else {
//       this.addSelectedItem(selectedItem, callOnChange)
//     }
//   }

//   removeItem = (item, cb) => {
//     this.setState(({selectedItems}) => {
//       return {
//         selectedItems: selectedItems.filter(i => i !== item),
//       }
//     }, cb)
//   }
//   addSelectedItem(item, cb) {
//     this.setState(
//       ({selectedItems}) => ({
//         selectedItems: [...selectedItems, item],
//       }),
//       cb,
//     )
//   }

//   getRemoveButtonProps = ({onClick, item, ...props} = {}) => {
//     return {
//       onClick: e => {
//         // TODO: use something like downshift's composeEventHandlers utility instead
//         onClick && onClick(e)
//         e.stopPropagation()
//         this.removeItem(item)
//       },
//       ...props,
//     }
//   }

//   getStateAndHelpers(downshift) {
//     const {selectedItems} = this.state
//     const {getRemoveButtonProps, removeItem} = this
//     return {
//       getRemoveButtonProps,
//       removeItem,
//       selectedItems,
//       ...downshift,
//     }
//   }
//   render() {
//     const {render, children = render, ...props} = this.props
//     // TODO: compose together props (rather than overwriting them) like downshift does
//     return (
//       <Downshift
//         {...props}
//         style={{width: 200, height: 100}}
//         stateReducer={this.stateReducer}
//         onChange={this.handleSelection}
//         selectedItem={null}
//       >
//       {downshift => (
//         this.choices.forEach((elem) =>{
//           return<div>elem!</div>
//         })
//         )}
//       {/*{downshift => children(this.getStateAndHelpers(downshift))}*/}
//       </Downshift>
//     )
//   }
// }


import React, { Component } from 'react'
import Downshift from 'downshift';

    export default class DownshiftThree extends Component {
      constructor(props) {
        super(props)
        this.choices = []

        this.state = {
          // currently selected dropdown item
          selectedDropItem: ''
        }

        this.onChange = this.onChange.bind(this)
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
      }

      componentDidUpdate(prevProps, prevState){
        if(prevProps.choices != this.props.choices){
          this.choices=[]
          console.log('hello!')
          this.props.choices.forEach((x) => {
              this.choices.push({name: x})
          })
        }
      }

      onChange(selectedDropItem) {
        // this.setState({ selectedDropItem: selectedDropItem.name })
        this.handleChange([this.props.tag,...selectedDropItem.name])
      }

      render() {
        return (
          <Downshift onChange={this.onChange} selectedItem={this.state.selectedDropItem} itemToString={choices => (choices ? choices.name : '')}>
            {({ 
              isOpen, 
              getToggleButtonProps,
               getItemProps, 
               highlightedIndex, 
               selectedItem: dsSelectedItem, 
               getLabelProps,
             }) => (
              <div>
                <button id={`${this.props.id}-button`} className="dropdown-button" {...getToggleButtonProps()}>
                  {this.state.selectedDropItem !== '' ? this.state.selectedDropItem : `Select ${this.props.tag}`}
                </button>
                <div style={{ position: 'relative' }}>
                  {isOpen ? (
                    <div id={`${this.props.id}-dropdown`} className="downshift-dropdown">
                      {
                        // map through all the books and render them
                        this.choices.map((item, index) => (
                          <div
                            id={`${this.props.id}-item`}
                            className="dropdown-item"
                            {...getItemProps({ 
                              key: index, index, item 
                            })}
                            style={{
                              fontWeight: dsSelectedItem === item ? 'bold' : 'normal',
                            }}>
                            {item.name}
                          </div>
                        ))
                      }
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </Downshift>
        )
      }
    }


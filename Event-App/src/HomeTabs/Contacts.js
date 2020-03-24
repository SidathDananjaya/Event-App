import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  PermissionsAndroid,
  Platform, Modal, TouchableHighlight, Alert,
} from 'react-native'
import ContactsLib from 'react-native-contacts'
import { styles } from './ContactStyles'
import PropTypes from 'prop-types'


import { Header } from 'react-native-elements';

export class Tab2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactList: [],
      selectedContact: [],
      text: '',
      isLoading: true,
      show:false,
      modalVisible: false,
    }
    this.arrayholder = []
  }

  //show model
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'App Contact Permission',
            message: 'This App needs access to your contacts ',

            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getListOfContacts()
        } else {
          this.setState({ isLoading: false })
          this.getOtherContacts()
        }
      } catch (err) {
        this.setState({ isLoading: false })
      }
    } else {
      ContactsLib.checkPermission((err, permission) => {
        if (permission === 'denied') {
          this.setState({ isLoading: false })
          this.getOtherContacts()
        } else {
          this.getListOfContacts()
        }
      })
    }
  }

  // Mics Method
  getOtherContacts = () => {
    const { otherContactList } = this.props
    const arrFinal = []
    if (otherContactList.length > 0) {
      otherContactList.map((listItem) => {
        arrFinal.push(listItem)
      })
    }
    arrFinal.map((listItem, index) => {
      listItem.isSelected = false
      listItem.id = index
    })
    this.setState({ contactList: arrFinal, isLoading: false })
    this.arrayholder = arrFinal
  }
  getListOfContacts = () => {
    const { otherContactList } = this.props
    const arrFinal = []

    ContactsLib.getAll((err, contacts) => {
      if (err) {
        throw err
      }
      contacts.map((listItem) => {
        arrFinal.push({
          fullname: listItem.givenName + ' ' + listItem.familyName,
          phoneNumber: listItem.phoneNumbers.length > 0 ? listItem.phoneNumbers[0].number : '',
          avatar: listItem.thumbnailPath,
        })
      })
      if (otherContactList.length > 0) {
        otherContactList.map((listItem) => {
          arrFinal.push(listItem)
        })
      }
      arrFinal.map((listItem, index) => {
        listItem.isSelected = false
        listItem.id = index
      })
      this.setState({ contactList: arrFinal, isLoading: false })
      this.arrayholder = arrFinal
    })
  }
  getSelectedContacts = () => {
    const { selectedContact } = this.state
    return selectedContact
  }
  checkContact = (item) => {
    const { onContactSelected, onContactRemove } = this.props
    let arrContact = this.state.contactList
    let arrSelected = this.state.selectedContact
    arrContact.map((listItem) => {
      if (listItem.id === item.id) {
        listItem.isSelected = !item.isSelected
      }
    })
    if (item.isSelected) {
      arrSelected.push(item)
      if (onContactSelected) {
        onContactSelected(item)
      }
    } else {
      if (onContactRemove) {
        onContactRemove(item)
      }
      arrSelected.splice(arrSelected.indexOf(item), 1)
    }

    this.setState({ contactList: arrContact, selectedContact: arrSelected })
    // this.setState({show:true})
    //for group button enable
    // this.showCreateGroup()
  }
  checkExist = (item) => {
    const { onContactRemove } = this.props
    let arrContact = this.state.contactList
    let arrSelected = this.state.selectedContact
    arrContact.map((listItem) => {
      if (listItem.id === item.id) {
        listItem.isSelected = false
      }
    })
    if (onContactRemove) {
      onContactRemove(item)
    }
    arrSelected.splice(arrSelected.indexOf(item), 1)
    this.setState({ contactList: arrContact, selectedContact: arrSelected })
  }

  SearchFilterFunction = (text) => {
    let newArr = []
    this.arrayholder.map(function(item) {
      const itemData = item.fullname.toUpperCase()
      const textData = text.toUpperCase()
      if (itemData.indexOf(textData) > -1) {
        newArr.push(item)
      }
    })
    this.setState({
      contactList: newArr,
      text: text,
    })
  }

  //Render Method

  _renderSeparator = () => {
    const { sepratorStyle } = this.props
    return <View style={[styles.sepratorStyle, sepratorStyle]} />
  }
  _renderItem = ({ item }) => {
    const { viewCheckMarkStyle } = this.props
    return (
      <TouchableOpacity onPress={() => this.checkContact(item)}>
        <View style={styles.viewContactList}>
          <Image
            source={item.avatar !== '' ? { uri: item.avatar } : require('../../images/user.png')}
            style={styles.imgContactList}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.txtContactList}>{item.fullname}</Text>
            <Text style={styles.txtPhoneNumber}>{item.phoneNumber}</Text>
          </View>
          {item.isSelected && (
            <Image
              source={require('../../images/check-mark.png')}
              style={[styles.viewCheckMarkStyle, viewCheckMarkStyle]}
            />
            
          )}
        </View>
      </TouchableOpacity>
    )
  }
  _renderItemHorizontal = ({ item }) => {
    const { viewCloseStyle } = this.props
    return (
      <View style={styles.viewSelectedContactList}>
        <Image
          source={item.avatar !== '' ? { uri: item.avatar } : require('../../images/user.png')}
          style={styles.imgSelected}
        />
        <TouchableOpacity
          onPress={() => this.checkExist(item)}
          style={[styles.viewCloseStyle, viewCloseStyle]}
        >
          <Image source={require('../../images/error.png')} style={styles.imgCancelStyle} />
        </TouchableOpacity>

        <Text style={styles.txtSelectedContact} numberOfLines={1}>
          {item.fullname}
        </Text>
        
      </View>
    )
  }

  //Group Button

  /* showCreateGroup=()=>{

    // const { show } = this.state;

    this.state.show=== false ? this.setState({show:true}) : this.setState({show:false})


    // if(show=false)
    // {
    //   this.setState({show:true})
    // }
    // else{
    //   this.setState({show:false})
    // }

    
};

hideCreateGroup=()=>{
    this.setState({show:false})
};

  _renderCreateGroup = () => {
    const { viewContactList, imgContactList, nameContainer, txtContactList} = this.props

    if(this.state.show){
    return (
      <TouchableOpacity>
          <View style={styles.viewContactList}>
            <Image
             source={ require('./Resources/user.png')}
             style={styles.imgContactList}
           />
           <View style={styles.nameContainer}>
             <Text style={styles.txtContactList}>Create New Group</Text>
           </View>
          
          </View>
        </TouchableOpacity>
    )
    }
  } */

  render() {
    const { searchBgColor, searchPlaceholder, viewSepratorStyle } = this.props
    return (
      <View style={styles.container}>

{/* model start */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={styles.viewModelNewGroup}>

            <View style={{ backgroundColor: '#004d66' }}>
              
                <View style={styles.newModelHeaderContainer}>
                  <Text style={styles.newGroupTxt}>New Group</Text>
                </View>
                
               {/* <View style={styles.newModelSaveContainer}>
                 <Text >Save</Text>
               </View>
               <View style={styles.newModelCancelContainer}>
                 <Text>Cancel</Text>
               </View> */}
              
            </View>

         {/* <Header
        
            // leftComponent={{ text: 'Cancel', style: { color: '#fff', fontWeight: "bold" } ,onPress(){Alert.alert('Modal has been closed.')}}}
            centerComponent={{ text: 'New Group', style: { color: '#fff', fontWeight: "bold", fontSize:16 } }}
            // rightComponent={{ text: 'Save', style: { color: '#fff', fontWeight: "bold" },onPress(){Alert.alert('Modal has been closed.')} }}
            
        /> */}
        <View style={styles.modelGroupNameContainer}>
          <Image style={styles.inputIcon} source={require('../../images/icons8-name-64.png')}/>
            <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder="Group Name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                />
            </View>
        </View>
        <View style={{height: 1,width: '100%',backgroundColor: '#DEDEDE',}} />

             <View style={styles.newModelHeaderContainer}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.selectedContact}
                    extraData={this.state}
                    renderItem={this._renderItemHorizontal}
                    horizontal
                />
             </View>
             
             <View style={styles.newModelButtonContainer}> 
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>{this.setModalVisible(!this.state.modalVisible);}}>
                  <Text style={styles.loginText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>{this.setModalVisible(!this.state.modalVisible);}}>
                  <Text style={styles.loginText}>Save</Text>
                </TouchableOpacity>

             </View>

              {/* <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight> */}
            
          </View>
        </Modal>

        {/* model end */}

        <TouchableOpacity onPress={() => {this.setModalVisible(true)}}>
          <View style={styles.viewNewGroup}>
            
           <View style={styles.newGroupContainer}>
             <Text style={styles.txtNewGroup}>New Group</Text>
           </View>
          
          </View>
        </TouchableOpacity>

        <View style={[styles.viewSearch, { backgroundColor: searchBgColor }]}>
          <TextInput
            style={styles.searchInput}
            placeholder={searchPlaceholder}
            onChangeText={this.SearchFilterFunction}
          />
        </View>

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.selectedContact}
            extraData={this.state}
            renderItem={this._renderItemHorizontal}
            horizontal
          />
        </View>

        {/* <TouchableOpacity>
          <View style={styles.viewContactList}>
            <Image
             source={ require('./Resources/user.png')}
             style={styles.imgContactList}
           />
           <View style={styles.nameContainer}>
             <Text style={styles.txtContactList}>Create New Group</Text>
           </View>
          
          </View>
        </TouchableOpacity> */}
{/* for group button show */}
{/* {this._renderCreateGroup()} */}
        
        {this.state.selectedContact.length > 0 && (
          <View style={[styles.viewSepratorStyle, viewSepratorStyle]} />
        )}
        {this.state.contactList.length > 0 && (
          <FlatList
            ListFooterComponent={this._renderSeparator}
            ItemSeparatorComponent={this._renderSeparator}
            showsVerticalScrollIndicator={false}
            data={this.state.contactList}
            renderItem={this._renderItem}
            onEndReachedThreshold={0.3}
            extraData={this.state}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        {this.state.isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} size="large" color="gray" />
          </View>
        )}
      </View>
    )
  }
}
Tab2.propTypes = {
  otherContactList: PropTypes.array,
  viewCloseStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  viewCheckMarkStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  sepratorStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  viewSepratorStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  searchBgColor: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onContactSelected: PropTypes.func,
  onContactRemove: PropTypes.func,
}

Tab2.defaultProps = {
  otherContactList: [],
  viewCloseStyle: {},
  viewCheckMarkStyle: {},
  sepratorStyle: {},
  viewSepratorStyle: {},
  searchBgColor: 'rgb(202,201,207)',
  searchPlaceholder: 'Search...',
  onContactSelected: () => {},
  onContactRemove: () => {},
}

export default Tab2

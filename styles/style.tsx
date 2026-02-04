import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeede5fa',
        paddingHorizontal:15,
        paddingVertical:20,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:30,
        
    },
    letter:{
        fontSize: 26,
        fontWeight:'500',
    },
    head:{
        // backgroundColor: 'white',
    },
    searchbar:{
        backgroundColor: 'white',
        flexDirection:'row',
        marginBottom:20,
        // gap:210,
        padding: 7,
        borderRadius:10,
        alignItems:'center',
    },
    searchInput:{
        flex:1,
        backgroundColor:'hsla(51, 37%, 93%, 0.98)',
        width:'85%',
        fontSize:16,
        color:'#333',
    },
    todocontainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        marginBottom:20,
        
    },
    todoinfocontainer:{
        flexDirection:'row',
        gap:20,
        alignItems:'center',
    },
    todotext:{
        fontSize:18,
        color:"#333",
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:5,

    },
    newtodo:{
        flex:1,
        backgroundColor:"white",
        padding:10,
        borderRadius:18,
        fontSize:16,
        color:'#333',
        marginEnd:10,
    },

    addbutton:{

    }


});

export default styles;
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView,Keyboard,StyleSheet,FlatList, Text, View, Image, ScrollView, TextInput, Pressable, TouchableOpacity, Alert,Button } from 'react-native';
import {useState,useEffect,useCallback} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./styles/style"
import {Checkbox} from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';


type ToDoType={
 id:number;
 title:string;
 isDone:boolean; 
}

export default function App() { 
  
  const [todos,setTodos]=useState<ToDoType[]>([])
  const [todoText,setTodoText]=useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);


  const addTodo= async ()=>{
    try{

      const newTodo={
        id:Math.floor(Math.random()*10) + 1,
        title: todoText,
        isDone:false
      };
      todos.push(newTodo);
      await AsyncStorage.setItem("my-todo",JSON.stringify(todos));
      setTodoText(''); 
      Keyboard.dismiss(); 
    }catch(error){
    console.log(error);
  }
  }

  const deleteTodo= async(id:number)=>{
    try{
      const newTodo=todos.filter((todo)=>todo.id!==id);
      await AsyncStorage.setItem("mytodo",JSON.stringify(todos))
      setTodos(newTodo);
    }catch(error){
      console.log(error);
    }
  }

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (query: string) => {
    if (query == "") {
      // setTodos(oldTodos);
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} >
        <TouchableOpacity onPress={()=>{alert('For more settings')}}>

        <Image source={{uri:"https://static.vecteezy.com/system/resources/previews/002/292/406/non_2x/hamburger-menu-line-icon-free-vector.jpg"}}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        </TouchableOpacity>
        <View style ={styles.head}>
        <Text style={styles.letter}>TO DO LIST</Text>
        </View>
        
        <TouchableOpacity onPress={()=>{alert('Want to Switch Account')}}>
        <Image source={{uri:"https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"}}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchbar}>
        <TextInput placeholder='Search' 
        style={styles.searchInput} 
        value={searchQuery}
        onChangeText={(text)=>setSearchQuery(text)}
        clearButtonMode="always"
        />
        
        <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/6351/6351888.png"}}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        
      </View>

      <FlatList 
        data={[...todos].reverse()}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>( 
          <ToDoItem todo={item} 
          deleteTodo={deleteTodo} 
          handleDone={handleDone}/>
        )}
        />

      <KeyboardAvoidingView style={styles.footer} behavior="padding" keyboardVerticalOffset={7}>
        
        <TextInput 
        placeholder='Add new Goals' 
        value={todoText}
        onChangeText={(text)=>setTodoText(text)} 
        style={styles.newtodo}
        />
            <TouchableOpacity onPress={()=>addTodo()}>
            <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/4601/4601618.png"}}
            style={{ width: 38, height: 50, borderRadius: 30 }}
            />
            </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem=({todo,deleteTodo,handleDone}:
  {todo:ToDoType,deleteTodo:(id:number)=>void,handleDone:(id:number)=>void})=>(   //have to define the deleteTodo function and it is providing nothing therefore "void"
  <View style={styles.todocontainer}>

    <View style={styles.todoinfocontainer}>
    <Checkbox value={todo.isDone}
      onValueChange={()=>handleDone(todo.id)} 
    color={todo.isDone ? "#e22e2e":undefined}
    
    />
    <Text style={
      [styles.todotext,
      todo.isDone && {textDecorationLine:'line-through'},]
    }>
      {todo.title}
      </Text>
    </View>
    <TouchableOpacity onPress={()=>{
      deleteTodo(todo.id);
      alert('Deleted '+todo.id)}}>
    <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd63Ix3zwAkL61PZme1N5Ndx0dImJWE25h7g&s"}}
    style={{ width: 40, height: 40, borderRadius: 20 }}
    />
    </TouchableOpacity>
      </View>
)





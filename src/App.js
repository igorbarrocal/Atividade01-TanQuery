import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, Button} from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';//Hook para fazer queries
import { fetchPosts, createUser } from './api/posts'


export default function App() {

    const { data, isLoading, isError,error, isFetching,refetch } = useQuery({
        queryKey: ['posts'], //Chave da query
        queryFn: fetchPosts //Função que busca os dados
    });

    //Mutation para criar um novo usuário
    const  mutation = useMutation({
        mutationFn: createUser, //Função que cria o usuário
        onSuccess: () => {
            refetch(); //Refaz a query para atualizar a lista de usuários
        }
    })    
    
    const newUser = {
        name: "Exemplo",
        avatar: "https://avatars.githubusercontent.com/u/75419383"
    }

    //Exibe um carregando enquanto os dados não chegam
    if (isLoading) {
        return <ActivityIndicator size="large" style={styles.center} />
    }

    //Exibe um erro caso ocorra
    if (isError) {
        return (
            <View>
                <Text style={styles.center}>Erro ao carregar os dados</Text>
                <Text style={styles.center}>{error.message}</Text>
            </View>
        )
    }

    return(
        <>
            <Button 
                title={mutation.isPending?'Criando Usuario...':'Criar Novo Usuario'} 
                onPress={() => mutation.mutate(newUser)}
                disabled={mutation.isPending}
            />
            <FlatList
                data={data}
                refreshing={isFetching}//Mostra o spinner durante o refetch
                onRefresh={refetch}//Chamada automatica do refetch ao puxar para baixo
                renderItem={({item})=>(
                    <View style={styles.item}> 
                        <Text style={styles.title}>{item.name}</Text>
                        <Image source={{uri: item.avatar}} style={{ width: 100, height: 100,}}></Image>
                        
                    </View> 
                )}
        />
    </>
    )
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item:{
        padding:16,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    title:{
        fontWeight:'bold',
        marginBottom:4
    }
})
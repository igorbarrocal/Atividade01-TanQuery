import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './api/posts';

export default function MainApp() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['users', page],
    queryFn: fetchUsers
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erro ao carregar usuários</Text>
        <Button title="Tentar novamente" onPress={() => refetch()} />
      </View>
    );
  }

  const usersPerPage = 6;
  const paginatedUsers = data.slice((page - 3) * usersPerPage, page * usersPerPage);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Atualizar" onPress={() => refetch()} disabled={isFetching} />
      {isFetching && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text>Atualizando clientes...</Text>
        </View>
      )}

      <FlatList
        data={paginatedUsers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text><Text style={styles.label}>Nome:</Text> {item.name}</Text>
            <Text><Text style={styles.label}>Cidade:</Text> {item.address?.city}</Text>
            <Text><Text style={styles.label}>Email:</Text> {item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Nenhum usuário encontrado.</Text>
          </View>
        }
      />

      <View style={styles.pagination}>
        <Button title="Anterior" onPress={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
        <Text style={styles.pageNumber}>Página {page}</Text>
        <Button
          title="Próxima"
          onPress={() => setPage((p) => p + 1)}
          disabled={page * usersPerPage >= data.length}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8', paddingTop: 65 },
  center: { justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
  error: { color: 'red', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  name: { fontSize: 16, fontWeight: 'bold' },
  label: { fontWeight: 'bold' },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  pageNumber: { alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }
});
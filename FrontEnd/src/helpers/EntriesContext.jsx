import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Api from './core/Api';

export const ViewState = {
  idle: 'idle',
  error: 'error',
  loading: 'loading'
};

export const EntryType = {
  Income: 'income',
  Expense: 'expense'
};

const EntriesContext = createContext({});

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [viewState, setViewState] = useState(ViewState.idle);

  const [entriesStats, setEntriesStats] = useState(null);
  const [categoriesStats, setCategoriesStats] = useState([]);

  const fetchEntries = useCallback(async () => {
    setViewState(ViewState.loading);
    const response = await Api.get('/entries');

    setViewState(ViewState.idle);
    setEntries(response.data);
  }, []);

  const fetchEntriesStats = useCallback(async () => {
    setViewState(ViewState.loading);
    const response = await Api.get('/entries/stats');

    setViewState(ViewState.idle);
    setEntriesStats(response.data);
  }, []);

  const fetchCategoriesStats = useCallback(async () => {
    setViewState(ViewState.loading);
    const response = await Api.get('/categories/stats');

    setViewState(ViewState.idle);
    setCategoriesStats(response.data);
  }, []);

  const fetchData = useCallback(async () => {
    await Promise.all([fetchEntries(), fetchEntriesStats(), fetchCategoriesStats()]);
  }, []);

  const addEntry = useCallback(async entry => {
    await Api.post('/entries', entry);

    fetchData();

    return true;
  }, []);

  const addCategory = useCallback(async category => {
    await Api.post('/categories', category);

    fetchData();

    return true;
  }, []);

  const editCategory = useCallback(async (id, category) => {
    await Api.patch(`/categories/${id}`, category);

    fetchData();

    return true;
  }, []);

  const editEntry = useCallback(async (id, entry) => {
    await Api.patch(`/entries/${id}`, entry);

    fetchData();

    return true;
  }, []);

  const deleteCategory = useCallback(async id => {
    await Api.delete(`/categories/${id}`);

    fetchData();

    return true;
  }, []);

  const deleteEntry = useCallback(async id => {
    await Api.delete(`/entries/${id}`);

    fetchData();

    return true;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      entries,
      viewState,
      entriesStats,
      categoriesStats,
      addEntry,
      addCategory,
      editCategory,
      editEntry,
      deleteCategory,
      deleteEntry
    }),
    [entries, entriesStats, categoriesStats]
  );

  return <EntriesContext.Provider value={contextValue}>{children}</EntriesContext.Provider>;
};

const useEntriesContext = () => {
  const context = useContext(EntriesContext);

  if (context === undefined) {
    throw new Error("It seems like you're using EntriesContext outside EntriesProvider!");
  }

  return context;
};

export default useEntriesContext;

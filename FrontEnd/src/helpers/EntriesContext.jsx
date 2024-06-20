import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Api from './core/Api';

export const ViewState = {
  idle: 'idle',
  error: 'error',
  loading: 'loading'
};

const EntriesContext = createContext({});

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [viewState, setViewState] = useState(ViewState.idle);

  //   const [categories, setCategories] = useState([]);
  //   const [categoriesStatus, setCategoriesStatus] = useState(ViewState.idle);

  const [entriesStats, setEntriesStats] = useState(null);
  const [categoriesStats, setCategoriesStats] = useState(null);

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

  useEffect(() => {
    fetchEntries();
    fetchEntriesStats();
    fetchCategoriesStats();
  }, []);

  const contextValue = useMemo(
    () => ({
      entries,
      viewState,
      entriesStats,
      categoriesStats,
      fetchEntries
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

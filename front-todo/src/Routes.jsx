import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MainTodoDashboard from "pages/main-todo-dashboard";
import TaskCreationAndEditModal from "pages/task-creation-and-edit-modal";
import AdvancedFiltersAndSearch from "pages/advanced-filters-and-search";
import SettingsAndPreferences from "pages/settings-and-preferences";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainTodoDashboard />} />
        <Route path="/main-todo-dashboard" element={<MainTodoDashboard />} />
        <Route path="/task-creation-and-edit-modal" element={<TaskCreationAndEditModal />} />
        <Route path="/advanced-filters-and-search" element={<AdvancedFiltersAndSearch />} />
        <Route path="/settings-and-preferences" element={<SettingsAndPreferences />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
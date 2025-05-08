// Asegúrate de tener lucide-react instalado: npm install lucide-react o yarn add lucide-react
import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Bell, UserCircle, Home, Users, Calendar, BarChart2, Settings, LayoutDashboard,
    ChevronDown, ChevronRight, PlusCircle, Star, X, ChevronsLeft, ChevronsRight, Bookmark, Image as ImageIcon,
    Pin, PinOff, RotateCcw
} from 'lucide-react';

// --- FILE: src/services/realEstateService.js ---
const realEstateService = {
  getFeatures: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulated feature data
    // Ensure icons are valid JSX components or icon names if using a library differently
    return [
      { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', isHomePageCandidate: true, isFavorite: true },
      {
        id: 'properties',
        name: 'Properties',
        icon: <Home size={20} />,
        path: '/properties/list',
        canAdd: true,
        isHomePageCandidate: false,
        isFavorite: false,
        subItems: [
          { id: 'properties-list', name: 'List Properties', path: '/properties/list', isFavorite: false, isHomePageCandidate: true },
          { id: 'properties-reports', name: 'Property Reports', path: '/properties/reports', isFavorite: false, isHomePageCandidate: true },
        ]
      },
      {
        id: 'clients',
        name: 'Clients',
        icon: <Users size={20} />,
        path: '/clients/list',
        canAdd: true,
        isHomePageCandidate: false,
        isFavorite: false,
        subItems: [
          { id: 'clients-list', name: 'List Clients', path: '/clients/list', isFavorite: false, isHomePageCandidate: true },
          { id: 'clients-communication', name: 'Communications', path: '/clients/communication', isFavorite: false, isHomePageCandidate: true },
        ]
      },
      { id: 'schedule', name: 'Schedule', icon: <Calendar size={20} />, path: '/schedule', isHomePageCandidate: true, isFavorite: false },
      { id: 'reports', name: 'General Reports', icon: <BarChart2 size={20} />, path: '/reports', isHomePageCandidate: true, isFavorite: false },
      { id: 'settings', name: 'Settings', icon: <Settings size={20} />, path: '/settings', isHomePageCandidate: true, isFavorite: false },
    ];
  },
};
// --- END FILE: src/services/realEstateService.js ---

// --- FILE: src/components/Sidebar/SidebarHeader.js ---
const SidebarHeader = ({
    isSidebarOpen,
    defaultHomePage,
    onNavigate,
    isSidebarPinned,
    onToggleSidebarPin,
    onToggleSidebar
}) => {
    return (
        <div className={`flex items-center border-b border-sky-600 w-full ${isSidebarOpen ? 'justify-between p-3 mb-3' : 'flex-col p-2 mb-2'}`}>
            <div
                className={`flex items-center text-white cursor-pointer ${isSidebarOpen ? 'flex-grow' : 'mb-2 justify-center w-full'}`}
                onClick={() => onNavigate(defaultHomePage)}
                title={isSidebarOpen ? "Go to Home" : `Agency - Home: ${defaultHomePage}`}
            >
                <ImageIcon size={isSidebarOpen ? 28 : 24} className={isSidebarOpen ? "mr-2" : ""} />
                {isSidebarOpen && <span className="font-semibold text-xl">Agency</span>}
            </div>
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebarPin}
                    className={`p-1 rounded-full group ${isSidebarOpen ? 'mr-1' : ''}`}
                    aria-label={isSidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                    title={isSidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                    {isSidebarPinned ? <PinOff size={16} className="text-sky-100 group-hover:text-white"/> : <Pin size={16} className="text-sky-300 group-hover:text-white"/>}
                </button>
                <button
                    onClick={onToggleSidebar}
                    className={`p-1 rounded-full group ${isSidebarPinned ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    title={isSidebarPinned ? (isSidebarOpen ? "Sidebar pinned (expanded)" : "Sidebar pinned (collapsed)") : (isSidebarOpen ? "Collapse sidebar" : "Expand sidebar")}
                    disabled={isSidebarPinned}
                >
                    {isSidebarOpen ? <ChevronsLeft size={18} className="text-sky-300 group-hover:text-white" /> : <ChevronsRight size={18} className="text-sky-300 group-hover:text-white" />}
                </button>
            </div>
        </div>
    );
};
// --- END FILE: src/components/Sidebar/SidebarHeader.js ---

// --- FILE: src/components/Sidebar/SidebarFavorites.js ---
const SidebarFavorites = ({
    isSidebarOpen,
    favoriteItems,
    isFavoritesOpen,
    toggleFavoritesCollapse,
    canClearFavorites,
    onUnfavoriteAll,
    defaultHomePage,
    onNavigate,
    isSubItemActive,
    onToggleFavorite,
    activeCollapsedPanel,
    onToggleActiveCollapsedPanel,
    collapsedPanelRef // Pass ref for click outside logic
}) => {
    if (!favoriteItems.length) return null;

    return (
        <>
            {/* Favorites Section (Expanded Sidebar) */}
            {isSidebarOpen && (
                <div className="mb-4">
                    <div
                        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sky-600 rounded-md group"
                        onClick={toggleFavoritesCollapse}
                        aria-expanded={isFavoritesOpen}
                        aria-controls="favorites-list-expanded"
                    >
                        <div className="flex items-center">
                            <h3 className="text-xs font-semibold text-sky-300 group-hover:text-white uppercase tracking-wider">
                            Favorites
                            </h3>
                            <span className="ml-2 bg-sky-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-lg">
                                {favoriteItems.length}
                            </span>
                            {canClearFavorites && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onUnfavoriteAll(); }}
                                    title="Reset favorites (except home)"
                                    className="ml-2 p-0.5 text-sky-300 hover:text-amber-400 group-hover:text-amber-300 rounded-full"
                                >
                                    <RotateCcw size={12} />
                                </button>
                            )}
                        </div>
                        {isFavoritesOpen ? <ChevronDown size={16} className="text-sky-300 group-hover:text-white" /> : <ChevronRight size={16} className="text-sky-300 group-hover:text-white" />}
                    </div>
                    <ul
                        id="favorites-list-expanded"
                        className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isFavoritesOpen ? 'max-h-96 mt-2' : 'max-h-0'}`}
                    >
                        {favoriteItems.map(favItem => {
                        const isFavItemDefaultHome = favItem.path === defaultHomePage;
                        const itemTitle = favItem.parentFeatureName ? `${favItem.parentFeatureName} - ${favItem.name}` : favItem.name;
                        const itemIcon = favItem.parentIcon || favItem.icon;
                        const starColorClasses = isFavItemDefaultHome ? 'text-sky-400 fill-sky-400 cursor-default' : 'text-yellow-400 fill-yellow-400';

                        return (
                        <li key={`exp-fav-${favItem.id}`} className="rounded-md">
                            <a
                            href={favItem.path}
                            onClick={(e) => { e.preventDefault(); onNavigate(favItem.path); }}
                            title={itemTitle}
                            className={`flex items-center p-2 text-sm rounded-md transition-colors duration-150 group/fav ${
                                isSubItemActive(favItem.path) ? 'bg-sky-800 text-white font-medium' : 'text-sky-200 hover:bg-sky-500 hover:text-white'
                            }`}
                            >
                            {itemIcon && React.isValidElement(itemIcon) ? React.cloneElement(itemIcon, { size: 16, className: "mr-2 opacity-90" }) : <span>[i]</span>}
                            <span className="truncate flex-grow">{favItem.name}</span>
                            {isFavItemDefaultHome && (
                                <Bookmark size={14} className="ml-auto mr-1 text-sky-300 fill-sky-300" />
                            )}
                            <Star
                                size={16}
                                className={`ml-1 cursor-pointer hover:scale-125 transition-transform ${starColorClasses}`}
                                onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (!isFavItemDefaultHome) {
                                    onToggleFavorite(favItem.parentFeatureId || favItem.id, favItem.parentFeatureId ? favItem.id : null);
                                }
                                }}
                            />
                            </a>
                        </li>
                        )})}
                    </ul>
                    <div className="my-3 border-b border-sky-600 opacity-50"></div>
                </div>
            )}

            {/* Favorites Icon and Panel (Collapsed Sidebar) */}
            {!isSidebarOpen && (
                <li className="w-full group/fav_item_collapsed list-none relative">
                    <div
                        className={`flex items-center w-full p-2 rounded-md text-sky-100 hover:bg-sky-600 cursor-pointer
                                    ${activeCollapsedPanel?.type === 'favorites' ? 'bg-sky-600' : ''}`}
                        onClick={() => onToggleActiveCollapsedPanel('favorites')}
                        title="Favorites"
                        aria-label="Show favorites"
                    >
                        <div className="p-1 rounded-md">
                            <Star
                                size={22}
                                className={`
                                    ${favoriteItems.some(fi => fi.path === defaultHomePage && fi.isFavorite)
                                        ? "fill-sky-400 text-sky-400"
                                        : "fill-transparent text-sky-300 group-hover/fav_item_collapsed:text-white"
                                    }
                                `}
                            />
                        </div>
                        <div className="flex flex-col items-center ml-1 relative">
                            {favoriteItems.length > 0 && (
                                <span
                                    className="bg-sky-500 text-white text-[10px] font-semibold rounded-lg h-4 w-4 flex items-center justify-center"
                                >
                                    {favoriteItems.length}
                                </span>
                            )}
                        </div>
                    </div>
                    {activeCollapsedPanel?.type === 'favorites' && (
                        <div
                            ref={collapsedPanelRef}
                            className="absolute left-full top-0 ml-2 w-60 bg-sky-700 p-3 rounded-md shadow-xl z-50 border border-sky-600 transition-opacity duration-200 ease-in-out opacity-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-2 pb-1 border-b border-sky-600">
                                <h3 className="text-sm font-semibold text-white">Favorites</h3>
                                {canClearFavorites && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onUnfavoriteAll(); onToggleActiveCollapsedPanel(null); }}
                                        title="Reset favorites (except home)"
                                        className="p-0.5 text-sky-300 hover:text-amber-400 rounded-full"
                                    >
                                        <RotateCcw size={12} />
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-1 max-h-60 overflow-y-auto">
                                {favoriteItems.map(favItem => {
                                    const isFavItemDefaultHome = favItem.path === defaultHomePage;
                                    const itemTitle = favItem.parentFeatureName ? `${favItem.parentFeatureName} - ${favItem.name}` : favItem.name;
                                    const itemIcon = favItem.parentIcon || favItem.icon;
                                    const starColorClassesCollapsed = isFavItemDefaultHome ? 'text-sky-400 fill-sky-400 cursor-default' : 'text-yellow-400 fill-yellow-400';
                                    return (
                                        <li key={`col-fav-${favItem.path}`} className="rounded-md">
                                            <a
                                                href={favItem.path}
                                                onClick={(e) => { e.preventDefault(); onNavigate(favItem.path); onToggleActiveCollapsedPanel(null); }}
                                                title={itemTitle}
                                                className={`flex items-center p-1.5 text-xs rounded-md transition-colors duration-150 group/fav-col ${
                                                    isSubItemActive(favItem.path) ? 'bg-sky-800 text-white font-medium' : 'text-sky-200 hover:bg-sky-500 hover:text-white'
                                                }`}
                                                >
                                                {itemIcon && React.isValidElement(itemIcon) ? React.cloneElement(itemIcon, { size: 14, className: "mr-2 opacity-90" }) : <span>[i]</span>}
                                                <span className="truncate flex-grow">{favItem.name}</span>
                                                {isFavItemDefaultHome && (
                                                    <Bookmark size={12} className="ml-auto mr-1 text-sky-300 fill-sky-300" />
                                                )}
                                                <Star
                                                    size={14}
                                                    className={`ml-1 cursor-pointer hover:scale-125 transition-transform ${starColorClassesCollapsed}`}
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    if (!isFavItemDefaultHome) {
                                                        onToggleFavorite(favItem.parentFeatureId || favItem.id, favItem.parentFeatureId ? favItem.id : null);
                                                    }
                                                    }}
                                                />
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </li>
            )}
        </>
    );
};
// --- END FILE: src/components/Sidebar/SidebarFavorites.js ---


// --- FILE: src/components/Sidebar/SidebarNavItem.js ---
const SidebarNavItem = ({
    feature,
    isSidebarOpen,
    openSubmenus,
    currentPage,
    defaultHomePage,
    onNavigate,
    toggleSubmenu,
    onSetDefaultHomePage,
    onToggleFavorite,
    onAddItem,
    onToggleActiveCollapsedPanel,
    activeCollapsedPanel,
    collapsedPanelRef
}) => {
    const isCurrentlyOpen = openSubmenus[feature.id];
    const isItemDefaultHome = defaultHomePage === feature.path;
    const isMainFeatureFavorite = isItemDefaultHome || feature.isFavorite;

    const isParentPageActive = currentPage === feature.path && feature.isHomePageCandidate;
    const isChildPageActive = feature.subItems && feature.subItems.some(sub => sub.path === currentPage);

    // Helper to determine if a feature (main or sub) is active
    const isFeatureActive = (feat) => {
        if (feat.path === currentPage && feat.isHomePageCandidate) return true;
        if (feat.subItems && feat.subItems.some(sub => sub.path === currentPage && sub.isHomePageCandidate)) return true;
        return false;
    };
    
    // Helper to determine if a sub-item is active
    const isSubItemActive = (subItemPath) => {
        return currentPage === subItemPath || currentPage.startsWith(subItemPath + '/');
    };


    let featureBaseClasses = "text-sky-100 hover:bg-sky-600 hover:text-white";
    let featureIconColor = "";
    let featureTextColor = "";

    if (isParentPageActive) {
        featureBaseClasses = "bg-sky-800 text-white font-semibold";
    } else if (isChildPageActive) {
        featureIconColor = "text-sky-300";
        featureTextColor = "text-sky-100";
    }

    if (isSidebarOpen) {
        return (
            <li className="rounded-md group/main">
              <div
                className={`flex items-center py-2.5 px-3 text-sm rounded-md transition-colors duration-150 ${featureBaseClasses}`}
              >
                <div className="flex items-center justify-start shrink-0 mr-1" style={{minWidth: '24px'}}>
                  {feature.isHomePageCandidate && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onSetDefaultHomePage(feature.path); }}
                        title={isItemDefaultHome ? "Current home page" : "Set as home page"}
                        className={`p-1 rounded-full transition-colors duration-150 opacity-0 group-hover/main:opacity-100 focus-within:opacity-100 ${
                          isItemDefaultHome ? 'text-sky-400 !opacity-100' : 'text-sky-300/70 hover:text-sky-100'
                        }`}
                      > <Bookmark size={16} fill={isItemDefaultHome ? 'currentColor' : 'none'} /> </button>
                  )}
                </div>

                <div
                  className="flex-grow flex items-center cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (feature.subItems && feature.subItems.length > 0) toggleSubmenu(feature.id);
                    if (feature.isHomePageCandidate || (!feature.subItems || feature.subItems.length === 0)) onNavigate(feature.path);
                  }}
                >
                  {feature.icon && React.isValidElement(feature.icon) ? React.cloneElement(feature.icon, { className: `mr-2 ${featureIconColor}` }) : <span>[i]</span>}
                  <span className={featureTextColor}>{feature.name}</span>
                </div>

                <div className="flex items-center shrink-0 ml-auto">
                    <div className="flex flex-col items-center mr-1">
                        {feature.isHomePageCandidate && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isItemDefaultHome) {
                                        onToggleFavorite(feature.id, null);
                                    }
                                }}
                                title={isItemDefaultHome ? "Home page (always favorite)" : (isMainFeatureFavorite ? "Remove from favorites" : "Add to favorites")}
                                className={`p-0.5 rounded-full transition-colors duration-150 group/star-button ${
                                    isItemDefaultHome || isMainFeatureFavorite ? 'opacity-100' : 'opacity-0 group-hover/main:opacity-100 focus-within:opacity-100'
                                } ${isItemDefaultHome ? 'cursor-default' : ''}`}
                            >
                            <Star
                                size={16}
                                className={`${
                                    isItemDefaultHome ? 'text-sky-400 fill-sky-400' :
                                    isMainFeatureFavorite ? 'text-yellow-400 fill-yellow-400' :
                                    'text-sky-300/70 fill-transparent group-hover/star-button:text-yellow-400'
                                } transition-colors`}
                            />
                            </button>
                        )}
                        {feature.canAdd && (
                            <button
                            onClick={(e) => { e.stopPropagation(); onAddItem(feature.id); }}
                            title={`Add new ${feature.name.toLowerCase()}`}
                            className="p-0.5 opacity-0 group-hover/main:opacity-100 focus-within:opacity-100 text-sky-300 hover:text-white hover:bg-sky-500/70 rounded-full transition-all duration-150"
                            > <PlusCircle size={18} />
                            </button>
                        )}
                    </div>

                  {feature.subItems && feature.subItems.length > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSubmenu(feature.id); }}
                      aria-label={isCurrentlyOpen ? `Collapse ${feature.name}` : `Expand ${feature.name}`}
                      className="p-1 text-sky-300 hover:text-white hover:bg-sky-500/70 rounded-full transition-colors duration-150"
                    > {isCurrentlyOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />} </button>
                  )}
                </div>
              </div>

              {feature.subItems && feature.subItems.length > 0 && (
                <ul className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${isCurrentlyOpen ? 'max-h-96 mt-1' : 'max-h-0'}`}>
                  {feature.subItems.map(subItem => (
                    <SidebarSubNavItem
                        key={subItem.id}
                        subItem={subItem}
                        parentFeatureId={feature.id}
                        currentPage={currentPage}
                        defaultHomePage={defaultHomePage}
                        onNavigate={onNavigate}
                        onSetDefaultHomePage={onSetDefaultHomePage}
                        onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </ul>
              )}
            </li>
        );
    } else { // Collapsed Rendering
        const isCollapsedItemActive = activeCollapsedPanel?.type === 'feature' && activeCollapsedPanel?.id === feature.id;
        return (
            <li className="w-full group/main_collapsed relative">
              <div
                className={`flex items-center w-full p-2 rounded-md text-sky-100 hover:bg-sky-600 ${ (isFeatureActive(feature) || isCollapsedItemActive) ? 'bg-sky-600' : ''}`}
              >
                <div
                  className="cursor-pointer p-1 rounded-md"
                  title={feature.name}
                  onClick={() => {
                    if (feature.subItems && feature.subItems.length > 0) {
                       onToggleActiveCollapsedPanel('feature', feature.id);
                    } else {
                        onNavigate(feature.path);
                        onToggleActiveCollapsedPanel(null);
                    }
                  }}
                >
                  {feature.icon && React.isValidElement(feature.icon) ? React.cloneElement(feature.icon, { size: 22 }) : null}
                </div>
                <div className="flex flex-col space-y-0.5 items-center ml-1">
                   {feature.isHomePageCandidate && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isItemDefaultHome) {
                            onToggleFavorite(feature.id, null);
                        }
                      }}
                      title={isItemDefaultHome ? "Home page (always favorite)" : (isMainFeatureFavorite ? "Remove from favorites" : "Add to favorites")}
                      className={`p-0.5 rounded transition-colors ${isItemDefaultHome ? 'cursor-default' : ''}`}
                    >
                      <Star size={14} className={`${isItemDefaultHome ? 'text-sky-400 fill-sky-400' : (isMainFeatureFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-sky-300/70 hover:text-yellow-300 fill-transparent')}`} />
                    </button>
                  )}
                  {feature.isHomePageCandidate && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onSetDefaultHomePage(feature.path); }}
                      title={isItemDefaultHome ? "Current home page" : "Set as home page"}
                      className={`p-0.5 rounded transition-colors ${isItemDefaultHome ? 'text-sky-400' : 'text-sky-300/70 hover:text-sky-100'}`}
                    >
                      <Bookmark size={14} fill={isItemDefaultHome ? 'currentColor' : 'none'} />
                    </button>
                  )}
                  {feature.canAdd && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddItem(feature.id); }}
                      title={`Add new ${feature.name.toLowerCase()}`}
                      className="p-0.5 rounded text-sky-300/70 hover:text-sky-100 transition-colors"
                    >
                      <PlusCircle size={16} />
                    </button>
                  )}
                </div>
              </div>
              {/* Collapsed Submenu Panel for Features */}
              {activeCollapsedPanel?.type === 'feature' && activeCollapsedPanel?.id === feature.id && feature.subItems && feature.subItems.length > 0 && (
                 <div
                    ref={collapsedPanelRef}
                    className="absolute left-full top-0 ml-2 w-60 bg-sky-700 p-3 rounded-md shadow-xl z-50 border border-sky-600 transition-opacity duration-200 ease-in-out opacity-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="text-sm font-semibold text-white mb-2 pb-1 border-b border-sky-600">{feature.name}</h3>
                    <ul className="space-y-1 max-h-60 overflow-y-auto">
                        {feature.subItems.map(subItem => {
                            const isSubItemDefaultHome = defaultHomePage === subItem.path;
                            const isSubItemFav = isSubItemDefaultHome || subItem.isFavorite;
                            return (
                            <li key={`col-sub-${subItem.id}`} className="rounded-md">
                                <a
                                    href={subItem.path}
                                    onClick={(e) => { e.preventDefault(); onNavigate(subItem.path); onToggleActiveCollapsedPanel(null); }}
                                    title={subItem.name}
                                    className={`flex items-center p-1.5 text-xs rounded-md transition-colors duration-150 group/sub-col ${
                                        isSubItemActive(subItem.path) ? 'bg-sky-800 text-white font-medium' : 'text-sky-200 hover:bg-sky-500 hover:text-white'
                                    }`}
                                >
                                    <span className="truncate flex-grow">{subItem.name}</span>
                                    {subItem.isHomePageCandidate && (
                                        <button onClick={(e) => { e.stopPropagation(); onSetDefaultHomePage(subItem.path); }} title={isSubItemDefaultHome ? "Current home page" : "Set as home page"} className={`p-0.5 ml-auto mr-1 rounded-full ${isSubItemDefaultHome ? 'text-sky-400' : 'text-sky-300/70 hover:text-sky-100'}`}>
                                            <Bookmark size={12} fill={isSubItemDefaultHome ? 'currentColor' : 'none'}/>
                                        </button>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); if(!isSubItemDefaultHome) onToggleFavorite(feature.id, subItem.id);}} title={isSubItemDefaultHome ? "Home (always favorite)" : (isSubItemFav ? "Remove from favorites" : "Add to favorites")} className={`p-0.5 rounded-full ${isSubItemDefaultHome ? 'cursor-default': ''}`}>
                                        <Star size={12} className={`${isSubItemDefaultHome ? 'text-sky-400 fill-sky-400' : (isSubItemFav ? 'text-yellow-400 fill-yellow-400' : 'text-sky-300/70 fill-transparent hover:text-yellow-400')}`}/>
                                    </button>
                                </a>
                            </li>
                        )})}
                    </ul>
                </div>
              )}
            </li>
          );
    }
};
// --- END FILE: src/components/Sidebar/SidebarNavItem.js ---

// --- FILE: src/components/Sidebar/SidebarSubNavItem.js ---
const SidebarSubNavItem = ({ subItem, parentFeatureId, currentPage, defaultHomePage, onNavigate, onSetDefaultHomePage, onToggleFavorite }) => {
    const isSubItemDefaultHome = defaultHomePage === subItem.path;
    const isSubItemFavorite = isSubItemDefaultHome || subItem.isFavorite;

    const isSubItemCurrentlyActive = () => {
        return currentPage === subItem.path || currentPage.startsWith(subItem.path + '/');
    }

    return (
        <li className="rounded-md group/subitem">
           <div className={`flex items-center p-2 text-sm rounded-md transition-colors duration-150 ${isSubItemCurrentlyActive() ? 'bg-sky-800 text-white font-medium' : 'text-sky-200 hover:bg-sky-500 hover:text-white'}`}>
            <div className="flex items-center justify-start shrink-0 mr-1" style={{minWidth: '24px'}}>
                {subItem.isHomePageCandidate && (
                    <button onClick={(e) => { e.stopPropagation(); onSetDefaultHomePage(subItem.path); }} title={isSubItemDefaultHome ? "Current home page" : "Set as home page"} className={`p-1 rounded-full transition-colors duration-150 opacity-0 group-hover/subitem:opacity-100 focus-within:opacity-100 ${isSubItemDefaultHome ? 'text-sky-400 !opacity-100' : 'text-sky-300/70 hover:text-sky-100'}`}>
                    <Bookmark size={14} fill={isSubItemDefaultHome ? 'currentColor' : 'none'} />
                    </button>
                )}
            </div>
            <span className="flex-grow cursor-pointer truncate" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate(subItem.path); }}>{subItem.name}</span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isSubItemDefaultHome) {
                        onToggleFavorite(parentFeatureId, subItem.id);
                    }
                }}
                title={isSubItemDefaultHome ? "Home page (always favorite)" : (isSubItemFavorite ? "Remove from favorites" : "Add to favorites")}
                className={`p-1 ml-2 rounded-full transition-opacity duration-150 group/star-button ${
                    isSubItemDefaultHome || isSubItemFavorite ? 'opacity-100' : 'opacity-0 group-hover/subitem:opacity-100 focus-within:opacity-100'
                } ${isSubItemDefaultHome ? 'cursor-default' : ''}`}
            >
              <Star
                size={16}
                className={`${
                    isSubItemDefaultHome ? 'text-sky-400 fill-sky-400' :
                    isSubItemFavorite ? 'text-yellow-400 fill-yellow-400' :
                    'text-sky-300/70 fill-transparent group-hover/star-button:text-yellow-400'
                } transition-colors`}
              />
            </button>
           </div>
        </li>
    );
};
// --- END FILE: src/components/Sidebar/SidebarSubNavItem.js ---

// --- FILE: src/components/Sidebar/Sidebar.js ---
const Sidebar = (props) => {
  return (
    <aside ref={props.sidebarRef} className={`bg-sky-700 text-sky-100 min-h-screen flex flex-col shadow-lg shrink-0 transition-all duration-300 ease-in-out ${props.isSidebarOpen ? 'w-72 p-4' : 'w-24 p-3 items-center'}`}>
      <SidebarHeader
        isSidebarOpen={props.isSidebarOpen}
        defaultHomePage={props.defaultHomePage}
        onNavigate={props.onNavigate}
        isSidebarPinned={props.isSidebarPinned}
        onToggleSidebarPin={props.onToggleSidebarPin}
        onToggleSidebar={props.onToggleSidebar}
      />

      <SidebarFavorites
        isSidebarOpen={props.isSidebarOpen}
        favoriteItems={props.favoriteItems} // FavoriteItems will need to be calculated in App.js and passed
        isFavoritesOpen={props.isFavoritesOpen}
        toggleFavoritesCollapse={props.toggleFavoritesCollapse}
        canClearFavorites={props.canClearFavorites} // canClearFavorites will need to be calculated in App.js
        onUnfavoriteAll={props.onUnfavoriteAll}
        defaultHomePage={props.defaultHomePage}
        onNavigate={props.onNavigate}
        isSubItemActive={props.isSubItemActive} // Will need the function from App.js
        onToggleFavorite={props.onToggleFavorite}
        activeCollapsedPanel={props.activeCollapsedPanel}
        onToggleActiveCollapsedPanel={props.onToggleActiveCollapsedPanel}
        collapsedPanelRef={props.collapsedPanelRef}
      />

      <nav className={`flex-grow overflow-y-auto ${!props.isSidebarOpen && 'overflow-x-hidden w-full mt-2'}`}>
        <ul className={`${!props.isSidebarOpen && 'space-y-1 flex flex-col items-center w-full'}`}>
          {props.features.map((feature) => (
            <SidebarNavItem
                key={feature.id}
                feature={feature}
                isSidebarOpen={props.isSidebarOpen}
                openSubmenus={props.openSubmenus}
                currentPage={props.currentPage}
                defaultHomePage={props.defaultHomePage}
                onNavigate={props.onNavigate}
                toggleSubmenu={props.toggleSubmenu}
                onSetDefaultHomePage={props.onSetDefaultHomePage}
                onToggleFavorite={props.onToggleFavorite}
                onAddItem={props.onAddItem}
                onToggleActiveCollapsedPanel={props.onToggleActiveCollapsedPanel}
                activeCollapsedPanel={props.activeCollapsedPanel}
                collapsedPanelRef={props.collapsedPanelRef}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
// --- END FILE: src/components/Sidebar/Sidebar.js ---

// --- FILE: src/components/Header/SearchComponentHeader.js ---
const SearchComponentHeader = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  const handleChange = (event) => setQuery(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) onSearch(query);
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full bg-slate-100 hover:bg-slate-200/70 shadow-sm rounded-lg p-1 transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-sky-500/70">
      <button type="submit" className="p-2 text-slate-500 hover:text-sky-600 focus:outline-none rounded-full transition-colors duration-200 flex items-center justify-center" aria-label="Search">
        <Search size={20} />
      </button>
      <input type="text" value={query} onChange={handleChange} placeholder={placeholder} className="flex-grow px-2 py-1.5 text-sm text-slate-700 bg-transparent rounded-lg focus:outline-none placeholder-slate-400"/>
    </form>
  );
};
// --- END FILE: src/components/Header/SearchComponentHeader.js ---

// --- FILE: src/components/Header/Header.js ---
const Header = ({ isSidebarOpen, isSidebarPinned, onToggleSidebar, onSearch }) => {
    const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;

    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <button
                onClick={onToggleSidebar}
                className={`text-slate-600 hover:text-sky-500 mr-3 p-1.5 rounded-md hover:bg-slate-100 ${isSidebarPinned && isSidebarOpen && typeof window !== "undefined" && window.innerWidth >=768 ? 'opacity-50 cursor-not-allowed' : '' }`}
                aria-label={isSidebarOpen ? "Collapse side menu" : "Expand side menu"}
                disabled={isSidebarPinned && isSidebarOpen && typeof window !== "undefined" && window.innerWidth >=768} // Disable if pinned and open on desktop
            >
              {isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 768 ? <X size={24}/> : <MenuIcon /> }
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-700 hidden sm:block">Real Estate Panel</h1>
          </div>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <SearchComponentHeader onSearch={onSearch} placeholder="Search properties, clients..."/>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button aria-label="Notifications" className="text-slate-500 hover:text-sky-500 transition-colors p-1.5 rounded-full hover:bg-slate-100"><Bell size={20} /></button>
            <button aria-label="User profile" className="text-slate-500 hover:text-sky-500 transition-colors p-1.5 rounded-full hover:bg-slate-100"><UserCircle size={20} /></button>
          </div>
        </header>
    );
};
// --- END FILE: src/components/Header/Header.js ---


// --- FILE: src/App.js ---
const INITIAL_FAVORITES_OPEN = true;

function App() {
  const [features, setFeatures] = useState([]);
  const [defaultHomePage, setDefaultHomePage] = useState('/dashboard');
  const [currentPage, setCurrentPage] = useState(defaultHomePage);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(INITIAL_FAVORITES_OPEN);
  const [activeCollapsedPanel, setActiveCollapsedPanel] = useState(null);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [sidebarPinnedStateOpen, setSidebarPinnedStateOpen] = useState(true);

  const sidebarRef = useRef(null); // Ref for the sidebar element itself
  const collapsedPanelRef = useRef(null); // Ref for the floating collapsed panel

  // Helper function to calculate favorite items
  const getFavoriteItems = (currentFeatures, currentDefaultHomePage) => {
    let allFavorites = [];
    let homePageItem = null;
    (currentFeatures || []).forEach(feature => {
      if (feature.isFavorite && feature.isHomePageCandidate) {
        const item = { ...feature, parentFeatureId: null, parentFeatureName: null, parentIcon: feature.icon, isMainFeature: true };
        if (feature.path === currentDefaultHomePage) homePageItem = item;
        else allFavorites.push(item);
      }
      if (feature.subItems) {
        feature.subItems.forEach(subItem => {
          if (subItem.isFavorite && subItem.isHomePageCandidate) {
            const item = { ...subItem, parentFeatureId: feature.id, parentFeatureName: feature.name, parentIcon: feature.icon, isMainFeature: false };
            if (subItem.path === currentDefaultHomePage) homePageItem = item;
            else allFavorites.push(item);
          }
        });
      }
    });
    allFavorites = [...new Map(allFavorites.map(item => [item.path, item])).values()]; // Deduplicate
    if (homePageItem) {
      allFavorites = allFavorites.filter(item => item.path !== homePageItem.path); // Remove home from list if present
      return [homePageItem, ...allFavorites]; // Ensure home is always first
    }
    return allFavorites;
  };

  const favoriteItems = getFavoriteItems(features, defaultHomePage);
  const canClearFavorites = favoriteItems.some(item => item.path !== defaultHomePage);

  const isSubItemActive = (subItemPath) => {
    return currentPage === subItemPath || currentPage.startsWith(subItemPath + '/');
  };


  useEffect(() => {
    const savedHomePage = typeof window !== "undefined" ? localStorage.getItem('defaultHomePage') : null;
    const initialHomePage = savedHomePage || '/dashboard';
    setDefaultHomePage(initialHomePage);
    setCurrentPage(initialHomePage);

    const savedPinned = typeof window !== "undefined" ? localStorage.getItem('sidebarPinned') === 'true' : false;
    const savedPinnedStateOpen = typeof window !== "undefined" ? localStorage.getItem('sidebarPinnedStateOpen') === 'true' : true;

    setIsSidebarPinned(savedPinned);
    if (savedPinned) {
        setIsSidebarOpen(savedPinnedStateOpen);
        setSidebarPinnedStateOpen(savedPinnedStateOpen);
    } else {
        // Default to open on desktop, closed on mobile if not pinned
        setIsSidebarOpen(typeof window !== "undefined" && window.innerWidth >= 768);
    }

    const fetchFeatures = async () => {
      let data = await realEstateService.getFeatures();
      data = data.map(feature => ({
        ...feature,
        isFavorite: feature.path === initialHomePage || feature.isFavorite || false,
        subItems: feature.subItems ? feature.subItems.map(sub => ({
            ...sub,
            isFavorite: sub.path === initialHomePage || sub.isFavorite || false,
            isHomePageCandidate: sub.isHomePageCandidate !== undefined ? sub.isHomePageCandidate : true
        })) : [],
        isHomePageCandidate: feature.isHomePageCandidate !== undefined ? feature.isHomePageCandidate : true
      }));
      setFeatures(data);
      const initialSubmenusState = {};
      data.forEach(feature => {
        if (feature.subItems && feature.subItems.length > 0) initialSubmenusState[feature.id] = false;
      });
      setOpenSubmenus(initialSubmenusState);
    };
    fetchFeatures();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Automatically open submenu if current page is a child of a feature
    let activeParentFeatureId = null;
    for (const feature of features) {
        if (feature.subItems && feature.subItems.some(sub => sub.path === currentPage)) {
            activeParentFeatureId = feature.id;
            break;
        }
    }

    setOpenSubmenus(prevOpenSubmenus => {
        const newSubmenusState = {};
        let changed = false;

        features.forEach(f => {
            const shouldBeOpen = f.id === activeParentFeatureId;
            if (prevOpenSubmenus[f.id] !== shouldBeOpen) {
                changed = true;
            }
            newSubmenusState[f.id] = shouldBeOpen;
        });

        // Only update if there's a change or if the number of features changed (initial load)
        if (changed || Object.keys(prevOpenSubmenus).length !== features.length) {
            return newSubmenusState;
        }
        return prevOpenSubmenus; // No change
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, features]); // Added features as dependency

  // Click outside handler for collapsed panels
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (collapsedPanelRef.current && !collapsedPanelRef.current.contains(event.target)) {
                // Check if the click was on a sidebar item that would open a panel
                // This check might need to be more sophisticated depending on exact behavior
                const isSidebarToggle = sidebarRef.current && sidebarRef.current.contains(event.target);
                if(!isSidebarToggle || isSidebarOpen) { // Don't close if clicking on sidebar to open a panel
                     setActiveCollapsedPanel(null);
                }
            }
        };

        if (activeCollapsedPanel) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeCollapsedPanel, isSidebarOpen]);


  const handleSearch = (query) => {
    console.log('Searching in dashboard:', query);
    // In a real app, you would navigate to a search results page or filter content
    // Using alert for demonstration as per instructions
    window.alert(`Dashboard search: ${query}`);
 };
  const handleNavigate = (path) => {
    setCurrentPage(path);
    // Close sidebar on mobile after navigation if not pinned
    if (!isSidebarPinned && typeof window !== "undefined" && window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
    }
     setActiveCollapsedPanel(null); // Close any open collapsed panels
  };

  const toggleSubmenu = (featureIdToToggle) => {
    setOpenSubmenus(prevOpenSubmenus => {
      const newOpenState = !prevOpenSubmenus[featureIdToToggle];
      // Collapse all other submenus when one is opened
      const newSubmenusState = {};
      Object.keys(prevOpenSubmenus).forEach(id => {
        newSubmenusState[id] = false; // Close all
      });
      if (newOpenState) { // If it was meant to be opened, open it
        newSubmenusState[featureIdToToggle] = true;
      }
      return newSubmenusState;
    });
  };

  const handleAddItem = (featureId) => {
    const featureName = features.find(f => f.id === featureId)?.name || 'item';
    // Using alert for demonstration as per instructions
    window.alert(`"Add" action for section: ${featureName}`);
     // Close sidebar on mobile after action if not pinned
     if (!isSidebarPinned && typeof window !== "undefined" && window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
    }
    setActiveCollapsedPanel(null); // Close any open collapsed panels
  };

  const toggleSidebar = () => {
    if (isSidebarPinned && typeof window !== "undefined" && window.innerWidth >= 768) return; // Don't toggle if pinned open on desktop
    const newIsSidebarOpen = !isSidebarOpen;
    setIsSidebarOpen(newIsSidebarOpen);
    if (!newIsSidebarOpen && activeCollapsedPanel) { // If closing sidebar, close any open panels
        setActiveCollapsedPanel(null);
    }
  };

  const toggleSidebarPin = () => {
    const newPinnedState = !isSidebarPinned;
    setIsSidebarPinned(newPinnedState);
    if (typeof window !== "undefined") {
        localStorage.setItem('sidebarPinned', newPinnedState.toString());
        if (newPinnedState) { // When pinning, save the current open/closed state
            localStorage.setItem('sidebarPinnedStateOpen', isSidebarOpen.toString());
            setSidebarPinnedStateOpen(isSidebarOpen); // Store the state it was pinned in
        } else { // When unpinning
             // Optional: Revert to default behavior (e.g., open on desktop, closed on mobile)
            // setIsSidebarOpen(window.innerWidth >= 768);
        }
    }
  };

  const handleToggleFavorite = (featureId, subItemId = null) => {
    let itemPathToToggle = '';
    let currentIsFavoriteState = false;

    // Find the item and its current favorite state
    const featureToToggle = features.find(f => f.id === featureId);
    if (featureToToggle) {
        if (subItemId && featureToToggle.subItems) {
            const subItemToToggle = featureToToggle.subItems.find(s => s.id === subItemId);
            if (subItemToToggle) {
                itemPathToToggle = subItemToToggle.path;
                currentIsFavoriteState = subItemToToggle.isFavorite;
            }
        } else if (!subItemId) { // It's a main feature
            itemPathToToggle = featureToToggle.path;
            currentIsFavoriteState = featureToToggle.isFavorite;
        }
    }

    // Prevent un-favoriting the current default home page
    if (itemPathToToggle === defaultHomePage && currentIsFavoriteState) {
        // Using alert for demonstration as per instructions
        window.alert("The home page cannot be un-favorited.");
        return;
    }

    setFeatures(prevFeatures =>
      prevFeatures.map(feature => {
        if (feature.id === featureId) {
          if (subItemId && feature.subItems) { // Toggle favorite for a sub-item
            return {
              ...feature,
              subItems: feature.subItems.map(subItem =>
                subItem.id === subItemId ? { ...subItem, isFavorite: !subItem.isFavorite } : subItem
              ),
            };
          } else if (!subItemId) { // Toggle favorite for a main feature
            return { ...feature, isFavorite: !feature.isFavorite };
          }
        }
        return feature;
      })
    );
  };

  const toggleFavoritesCollapse = () => setIsFavoritesOpen(prev => !prev);

  const toggleActiveCollapsedPanel = (panelType, id = null) => {
    if (isSidebarOpen) return; // Panels are only for collapsed sidebar

    setActiveCollapsedPanel(prevPanel => {
        if (panelType === null) return null; // Explicitly closing
        // If clicking the same panel icon again, close it
        if (prevPanel?.type === panelType && prevPanel?.id === id) return null;
        // Otherwise, open the new panel
        return { type: panelType, id: id };
    });
  };

  const handleUnfavoriteAll = () => {
    setFeatures(prevFeatures =>
      prevFeatures.map(feature => {
        // Check if the feature itself is the home page and a candidate
        const isFeatureItselfHome = feature.path === defaultHomePage && feature.isHomePageCandidate;
        
        // Process sub-items: only keep favorite if it's the home page
        const newSubItems = feature.subItems
          ? feature.subItems.map(subItem => {
              const isSubItemHomeAndCandidate = subItem.path === defaultHomePage && subItem.isHomePageCandidate;
              return { ...subItem, isFavorite: isSubItemHomeAndCandidate };
            })
          : []; // Handle cases where subItems might be undefined or null

        return {
          ...feature,
          isFavorite: isFeatureItselfHome, // Main feature is favorite only if it's the home page
          subItems: newSubItems,
        };
      })
    );
    // Using alert for demonstration as per instructions
    window.alert("All non-home favorites cleared.");
  };


  const handleSetDefaultHomePage = (path) => {
    setDefaultHomePage(path);
    if (typeof window !== "undefined") localStorage.setItem('defaultHomePage', path);
    
    // Ensure the new home page is marked as favorite
    setFeatures(prevFeatures =>
        prevFeatures.map(feature => {
            let isFeatureFavorite = feature.isFavorite;
            // If this feature is the new home page and a candidate, mark as favorite
            if (feature.path === path && feature.isHomePageCandidate) {
                isFeatureFavorite = true;
            }
            // Process sub-items
            const newSubItems = feature.subItems ? feature.subItems.map(sub => {
                let isSubFavorite = sub.isFavorite;
                // If this sub-item is the new home page and a candidate, mark as favorite
                if (sub.path === path && sub.isHomePageCandidate) {
                    isSubFavorite = true;
                }
                return { ...sub, isFavorite: isSubFavorite };
            }) : [];
            return { ...feature, isFavorite: isFeatureFavorite, subItems: newSubItems };
        })
    );

    // Find the name of the page for the alert message
    const pageName = features.find(f => f.path === path)?.name || features.flatMap(f => f.subItems || []).find(s => s.path === path)?.name || path;
    // Using alert for demonstration as per instructions
    window.alert(`"${pageName}" set as default home page and marked as favorite.`);
  };

  // Render page content based on currentPage
  const renderPageContent = () => {
    let title = "Page Not Found"; // Default title
    // Check main features
    const currentFeature = features.find(f => f.path === currentPage && f.isHomePageCandidate);
    // Check sub-items
    const currentSubItem = features.flatMap(f => f.subItems || []).find(s => s.path === currentPage && s.isHomePageCandidate);

    if (currentFeature) title = currentFeature.name;
    else if (currentSubItem) title = currentSubItem.name;
    else if (currentPage === '/dashboard') title = "Dashboard View"; // Fallback for initial default
    
    return <h2 className="text-2xl font-semibold text-slate-700">{title}</h2>;
  };

  // Effect to handle window resize for sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (!isSidebarPinned) { // Only adjust if not pinned
        if (window.innerWidth < 768) { // Mobile view
          setIsSidebarOpen(false); // Collapse sidebar
        } else { // Desktop view
          setIsSidebarOpen(true); // Expand sidebar
        }
      } else {
        // If pinned, maintain the pinned state (open or closed)
        setIsSidebarOpen(sidebarPinnedStateOpen);
      }
       setActiveCollapsedPanel(null); // Close any open panels on resize
    };

    if (typeof window !== "undefined") {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set state based on current window size
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('resize', handleResize);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarPinned, sidebarPinnedStateOpen]); // Rerun on pin state change


  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar container - handles mobile overlay and desktop fixed/relative positioning */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 md:shrink-0 
                      ${isSidebarOpen ? 'translate-x-0 w-72 md:w-72' : '-translate-x-full w-72 md:w-24'}`}>
        <Sidebar
          features={features}
          onNavigate={handleNavigate}
          openSubmenus={openSubmenus}
          toggleSubmenu={toggleSubmenu}
          onAddItem={handleAddItem}
          currentPage={currentPage}
          onToggleFavorite={handleToggleFavorite}
          isFavoritesOpen={isFavoritesOpen}
          toggleFavoritesCollapse={toggleFavoritesCollapse}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          defaultHomePage={defaultHomePage}
          onSetDefaultHomePage={handleSetDefaultHomePage}
          activeCollapsedPanel={activeCollapsedPanel}
          onToggleActiveCollapsedPanel={toggleActiveCollapsedPanel}
          isSidebarPinned={isSidebarPinned}
          onToggleSidebarPin={toggleSidebarPin}
          onUnfavoriteAll={handleUnfavoriteAll}
          // Pass calculated props to Sidebar
          favoriteItems={favoriteItems}
          canClearFavorites={canClearFavorites}
          isSubItemActive={isSubItemActive} // Pass the function itself
          sidebarRef={sidebarRef} // Pass the ref for the sidebar
          collapsedPanelRef={collapsedPanelRef} // Pass the ref for collapsed panels
        />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 768 && !isSidebarPinned && (
        <div className="fixed inset-0 z-20 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
            isSidebarOpen={isSidebarOpen}
            isSidebarPinned={isSidebarPinned}
            onToggleSidebar={toggleSidebar}
            onSearch={handleSearch}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-4 sm:p-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            {renderPageContent()}
            <p className="text-slate-600 mt-4 text-sm sm:text-base">
              This is an example of how the page content might look. Navigation is simulated.
              Default home page: <span className="font-semibold">{defaultHomePage}</span>
            </p>
             {/* Example of how to display current page for debugging/demo */}
            <p className="text-slate-500 mt-2 text-xs">Current route: {currentPage}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

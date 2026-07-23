"use client";

import React, { createContext, useContext, useState } from "react";
import { MovieDetailView } from "./MovieDetailView";

interface MovieDetailContextType {
  openMovie: (id: string, options?: { showLikedBy?: boolean; sessionCode?: string | null; provider?: string }) => void;
  closeMovie: () => void;
}

const MovieDetailContext = createContext<MovieDetailContextType | undefined>(undefined);

export function MovieDetailProvider({ children }: { children: React.ReactNode }) {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [showLikedBy, setShowLikedBy] = useState<boolean | undefined>();
  const [sessionCode, setSessionCode] = useState<string | null | undefined>();
  const [provider, setProvider] = useState<string | undefined>();

  const openMovie = (id: string, options?: { showLikedBy?: boolean; sessionCode?: string | null; provider?: string }) => { 
    setSelectedMovieId(id); 
    setShowLikedBy(options?.showLikedBy);
    setSessionCode(options?.sessionCode);
    setProvider(options?.provider);
  }
  const closeMovie = () => { 
    setSelectedMovieId(null); 
    setShowLikedBy(undefined);
    setSessionCode(undefined);
    setProvider(undefined);
  }

  return (
    <MovieDetailContext.Provider value={{ openMovie, closeMovie }}>
      {children}
      <MovieDetailView 
        movieId={selectedMovieId} 
        onClose={closeMovie} 
        showLikedBy={showLikedBy} 
        sessionCode={sessionCode}
        provider={provider}
      />
    </MovieDetailContext.Provider>
  );
}

export function useMovieDetail() {
  const context = useContext(MovieDetailContext);
  if (context === undefined) {
    throw new Error("useMovieDetail must be used within a MovieDetailProvider");
  }
  return context;
}

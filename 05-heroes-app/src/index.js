import React from 'react';
import ReactDOM from "react-dom/client";

import { HeroesApp } from './HeroesApp';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<HeroesApp />);

import { Component } from 'react';
import type { ReactNode } from 'react';

interface SceneBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface SceneBoundaryState {
  failed: boolean;
}

export class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false };

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

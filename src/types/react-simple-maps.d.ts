declare module "react-simple-maps" {
  import type { ComponentType, CSSProperties, ReactNode } from "react";

  interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  interface GeographiesChildrenArgs {
    geographies: Array<{
      id: string;
      rsmKey: string;
      properties: Record<string, unknown>;
    }>;
  }

  interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (args: GeographiesChildrenArgs) => ReactNode;
  }

  interface GeographyStyleState {
    outline?: string;
    cursor?: string;
    fill?: string;
  }

  interface GeographyProps {
    geography: Record<string, unknown>;
    key?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: GeographyStyleState;
      hover?: GeographyStyleState;
      pressed?: GeographyStyleState;
    };
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
  }

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    key?: string;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
}

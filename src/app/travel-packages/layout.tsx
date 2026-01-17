import React from 'react';
import { Metadata } from 'next';
import { metadata as travelPackagesMetadata } from './metadata';

export const metadata: Metadata = travelPackagesMetadata;

export default function TravelPackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
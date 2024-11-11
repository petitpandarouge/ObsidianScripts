import { Property } from '@obsinflate/api/meta-edit/property';
import { TFile } from 'obsidian';

export interface MetaEditApi {
    autoprop: (propertyName: string) => void;
    update: (
        propertyName: string,
        propertyValue: string,
        file: TFile | string
    ) => Promise<void>;
    getPropertyValue: (
        propertyName: string,
        file: TFile | string
    ) => Promise<unknown>;
    getFilesWithProperty: (propertyName: string) => TFile[];
    createYamlProperty: (
        propertyName: string,
        propertyValue: string,
        file: TFile | string
    ) => Promise<void>;
    getPropertiesInFile: (file: TFile | string) => Promise<Property[]>;
}

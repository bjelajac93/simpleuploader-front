export interface FileData {
     id: string;
     fileName: string;
     fileSize: number;
     fileType: string;
     uploadDate: Date;
}

export interface FileGroup {
     fileData: FileData[];
     fileType: string;
}
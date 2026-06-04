import fs from 'fs';
import path from 'path';

/**
 * Create backup of mods folder
 */
export async function createBackup(modsPath: string, backupPath: string): Promise<BackupResult> {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(modsPath)) {
        throw new Error(`Mods folder not found: ${modsPath}`);
      }

      // Create backup directory with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupDir = path.join(backupPath, `sims-hub-backup-${timestamp}`);

      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }

      fs.mkdirSync(backupDir, { recursive: true });

      // Copy mods folder
      const modsBackupPath = path.join(backupDir, 'Mods');
      copyDirectory(modsPath, modsBackupPath);

      // Create metadata file
      const modsCount = countModFiles(modsBackupPath);
      const metadata = {
        timestamp: new Date().toISOString(),
        modsCount,
        originalPath: modsPath,
        backupPath: backupDir,
      };

      fs.writeFileSync(
        path.join(backupDir, 'backup-metadata.json'),
        JSON.stringify(metadata, null, 2)
      );

      resolve({
        success: true,
        backupPath: backupDir,
        modsCount,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Restore from backup
 */
export async function restoreBackup(
  backupPath: string,
  modsPath: string
): Promise<RestoreResult> {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(backupPath)) {
        throw new Error(`Backup folder not found: ${backupPath}`);
      }

      const modsBackupPath = path.join(backupPath, 'Mods');

      if (!fs.existsSync(modsBackupPath)) {
        throw new Error('No Mods folder found in backup');
      }

      // Create a safety backup of current mods
      const safetyBackupPath = path.join(path.dirname(modsPath), 'Mods-pre-restore');
      if (fs.existsSync(modsPath)) {
        copyDirectory(modsPath, safetyBackupPath);
      }

      // Clear current mods folder
      if (fs.existsSync(modsPath)) {
        fs.rmSync(modsPath, { recursive: true });
      }

      // Restore from backup
      copyDirectory(modsBackupPath, modsPath);

      const modsCount = countModFiles(modsPath);

      resolve({
        success: true,
        modsCount,
        safetyBackupPath,
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * List available backups
 */
export function listBackups(backupPath: string): BackupInfo[] {
  const backups: BackupInfo[] = [];

  try {
    if (!fs.existsSync(backupPath)) {
      return backups;
    }

    const entries = fs.readdirSync(backupPath);

    for (const entry of entries) {
      const fullPath = path.join(backupPath, entry);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory() && entry.startsWith('sims-hub-backup-')) {
        const metadataPath = path.join(fullPath, 'backup-metadata.json');

        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
          backups.push({
            name: entry,
            path: fullPath,
            timestamp: new Date(metadata.timestamp),
            modsCount: metadata.modsCount,
          });
        } catch (error) {
          console.error(`Error reading backup metadata for ${entry}:`, error);
        }
      }
    }

    return backups.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  } catch (error) {
    console.error(`Error listing backups:`, error);
    return backups;
  }
}

/**
 * Delete backup
 */
export function deleteBackup(backupPath: string): boolean {
  try {
    if (fs.existsSync(backupPath)) {
      fs.rmSync(backupPath, { recursive: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting backup:`, error);
    return false;
  }
}

// Helper functions
function copyDirectory(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);

  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function countModFiles(dirPath: string): number {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter((f) => f.endsWith('.package')).length;
  } catch (error) {
    console.error(`Error counting mod files:`, error);
    return 0;
  }
}

// Type definitions
export interface BackupResult {
  success: boolean;
  backupPath: string;
  modsCount: number;
}

export interface RestoreResult {
  success: boolean;
  modsCount: number;
  safetyBackupPath: string;
}

export interface BackupInfo {
  name: string;
  path: string;
  timestamp: Date;
  modsCount: number;
}

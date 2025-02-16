import fs from 'fs';
const deleteFile = (path:string) => {
  fs.unlinkSync(path);
}
export default deleteFile;
const jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

const saveAvatar = async (req) => {
  const AVATARS_FOLDER = process.env.AVATARS_FOLDER;
  const filePath = req.file.path;
  const newAvatarName = `${Date.now().toString()}-${req.file.originalname}`;
  const tempImg = await jimp.read(filePath);
  await tempImg
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(filePath);
  try {
    await fs.rename(filePath, path.join(process.cwd(), 'public', AVATARS_FOLDER, newAvatarName));
  } catch (error) {
    console.log(error.message);
  }

  const oldAvatar = req.user.avatarURL;

  if (oldAvatar && oldAvatar.includes(AVATARS_FOLDER)) {
    try {
      await fs.unlink(path.join(process.cwd(), 'public', oldAvatar));
    } catch (error) {
      console.log(error.message);
    }
  }
  return path.join(AVATARS_FOLDER, newAvatarName);
};

module.exports = saveAvatar;

const localProvider = {
    bucket: 'public/photos',
    provider: 'local',
    options: {
      baseUrl: '/photos',
      key: (req, file, data) => {
        const ext = path.extname(file.originalname);
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        data.file = `public/photos/${randomName}${ext}`;
        return `public/photos/${randomName}${ext}`;
      },
      mimeType: (req, file) => {
        return new Promise((resolve, reject) => {
          if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
            resolve(file.mimetype);
          } else {
            reject(new Error('Mime type must be jpeg or png'));
          }
        });
      },
    },
  };
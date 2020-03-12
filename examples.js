exports.examplePosts = ()=>{
  const testPost1 = {
    title: 'Heading',
    content: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.', 
    category: 'other'
  };
  const testPost2 = {
    title: 'Gym stuff',
    content: "I don't need school, Gym are evrything I Need",
    category: 'gym'
  };
  const testPost3 = {
    title: 'My favorite recipe',
    content: 'Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. Chicken, Rice, Beer. ',
    category: 'recipes'
  };
  const testPost4 = {
    title: 'Some programming',
    content: "I do like Javascript and Python. Sed porta sed mi vel finibus. Aliquam ut lacinia nulla, sit amet imperdiet nisi. Maecenas cursus orci massa, sit amet vehicula augue condimentum sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. In congue, nunc sit amet blandit sollicitudin, dolor mauris suscipit massa, ac ullamcorper magna elit et erat. Maecenas sit amet lobortis orci. Morbi mattis tellus vitae placerat accumsan. Morbi elementum egestas iaculis. Etiam viverra sapien eget erat porta, eget rutrum ex dapibus. Curabitur facilisis finibus sapien at iaculis. Integer egestas vestibulum dolor nec rhoncus. Nam dui odio, suscipit a est id, bibendum tristique felis. Curabitur venenatis facilisis felis, nec ornare tortor porttitor sed.",
    category: 'programming'
  };
  const posts = [testPost1, testPost2, testPost3, testPost4];

  for (let i=0; i<3; i++) {
    const testGym = {
      title: 'Gym '+i,
      content: "I love gym. ".repeat(i*10+1),
      category: 'gym'
    };
    posts.unshift(testGym);
  }
  for (let i=0; i<2; i++) {
    const testGym = {
      title: 'My egg recipe '+i,
      content: "I love eggs <3 ".repeat(i*20+1),
      category: 'recipes'
    };
    posts.unshift(testGym);
  }
  for (let i=0; i<2; i++) {
    const testGym = {
      title: 'Title programming '+i,
      content: "I do like Javascript and Python. Sed porta sed mi vel finibus. Aliquam ut lacinia nulla, sit amet imperdiet nisi. Maecenas cursus orci massa, sit amet vehicula augue condimentum sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. In congue, nunc sit amet blandit sollicitudin, dolor mauris suscipit massa, ac ullamcorper magna elit et erat. Maecenas sit amet lobortis orci. Morbi mattis tellus vitae placerat accumsan. Morbi elementum egestas iaculis. Etiam viverra sapien eget erat porta, eget rutrum ex dapibus. Curabitur facilisis finibus sapien at iaculis. Integer egestas vestibulum dolor nec rhoncus. Nam dui odio, suscipit a est id, bibendum tristique felis. Curabitur venenatis facilisis felis, nec ornare tortor porttitor sed. ".repeat(i+1),
      category: 'programming'
    };
    posts.unshift(testGym);
  }
  return posts;
}

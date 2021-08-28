export const group_by_date = (data) => {
  const groups = data.reduce((groups, game) => {
    const date = game.created_at.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(game);
    return groups;
  }, {});

  // Edit: to add it in the array format instead
  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      message: groups[date],
    };
  });
  return groupArrays;
};

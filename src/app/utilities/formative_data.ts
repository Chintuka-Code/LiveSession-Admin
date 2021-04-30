export class FormativeData {
  // formalized data which is accepted by tree
  static format(data) {
    const output = [];
    data.forEach((obj) => {
      const dest = output.find((target) => target.data.name === obj.groupBy);
      if (!dest) {
        output.push({
          data: { name: obj.groupBy },
          children: [{ data: { name: obj.permission_name, code: obj.code } }],
        });
      } else {
        dest.children.push({
          data: { name: obj.permission_name, code: obj.code },
        });
      }
    });
    return output;
  }

  // Remove those nodes who don't have permission code generally parents nodes
  static removeParent(data: any[]) {
    const filterdata = data.map((res) => res.data.code);
    return [...new Set(filterdata.filter((el) => el))];
  }

  static format_firebase_get_request_data(input) {
    let response = [];

    input.forEach((doc) => {
      const data = doc.data();
      data['doc_id'] = doc.id;
      response.push(data);
    });

    return response;
  }
}

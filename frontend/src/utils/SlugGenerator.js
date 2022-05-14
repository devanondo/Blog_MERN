export default function slugify(username) {
  let slug = username?.toLowerCase().split(" ").join("-");
  return slug;
}

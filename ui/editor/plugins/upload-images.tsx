import { uploadFile } from "@/lib/services/storage.service";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import { toast } from "sonner";

const uploadKey = new PluginKey("upload-image");

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        // See if the transaction adds or removes any placeholders
        const action = tr.getMeta(this);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement("div");
          placeholder.setAttribute("class", "img-placeholder");
          const image = document.createElement("img");
          image.setAttribute(
            "class",
            "opacity-40 rounded-lg border border-stone-200"
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(null, null, (spec) => spec.id == action.remove.id)
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startImageUpload(file: File, view: EditorView, pos: number) {
  // check if the file is an image
  if (!file.type.includes("image/")) {
    toast.error("File type not supported.");
    return;

    // check if the file size is less than 20MB
  } else if (file.size / 1024 / 1024 > 20) {
    toast.error("File size too big (max 20MB).");
    return;
  }

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        pos,
        src: reader.result,
      },
    });
    view.dispatch(tr);
  };

  handleImageUpload(file).then((src) => {
    const { schema } = view.state;

    let pos = findPlaceholder(view.state, id);
    // If the content around the placeholder has been deleted, drop
    // the image
    if (pos == null) return;

    // Otherwise, insert it at the placeholder's position, and remove
    // the placeholder

    const imageSrc = typeof src === "object" ? reader.result : src;

    const node = schema.nodes.image.create({ src: imageSrc });
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

export const handleImageUpload = async (file) => {
  try {
    const res = await uploadFile(file);
    const fileUrl = `${
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    }/storage/buckets/${
      process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID
    }/files/${res.$id!}/view?project=${
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    }&mode=admin`; // Replace `getFileUrl` with your logic to get the file URL
    toast.success("Image uploaded successfully!");
    return { fileUrl, successMessage: "Image uploaded successfully!" };
  } catch (error) {
    console.log(error);
    toast.error("Error uploading image. Please try again.");
    return file;
  }
};

// export const handleImageUpload = (file: File) => {
//   return new Promise((resolve) => {
//     toast.promise(
//       uploadFile(file)
//         .then(async (res) => {
//           const file_url: string = `${
//             process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
//           }/storage/buckets/${
//             process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID
//           }/files/${res.$id!}/view?project=${
//             process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
//           }&mode=admin`;

//           let image = new Image();
//           image.src = file_url;
//           image.onload = () => {
//             resolve(file_url);
//           };
//         })
//         .catch((e: any) => {
//           resolve(file);
//           console.log(e);
//           throw new Error("Error uploading image. Please try again.");
//         }),
//       {
//         loading: "Uploading image...",
//         success: "Image uploaded successfully!",
//         error: (err) => {
//           return err.message;
//         },
//       }
//     );
//   });
// };

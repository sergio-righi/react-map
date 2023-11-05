import { Custom, Form } from "components";
import { useApp } from "contexts";
import { ISavedList } from "interfaces";

type Props = {
  open: boolean;
  savedList: ISavedList | null;
  onClose: () => void;
  onSubmit: (savedList: ISavedList) => void;
};

export const SavedList = ({
  open = false,
  savedList,
  onClose,
  ...props
}: Props) => {
  const { t } = useApp();

  function handleClose() {
    onClose();
  }

  return (
    <Custom.Modal
      open={open}
      onClose={handleClose}
      sx={{ maxWidth: 400 }}
      title={
        (savedList ? t.action.edit : t.action.create) + " " + t.title.saved_list
      }
    >
      <Form.SavedList onSubmit={props.onSubmit} savedList={savedList} />
    </Custom.Modal>
  );
};

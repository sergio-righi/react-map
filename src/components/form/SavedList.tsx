import { Custom, Input } from "components";
import { useApp, useService, useTheme } from "contexts";
import { useForm } from "hooks";
import { Enums } from "utils";
import { Box, Grid, Stack } from "@mui/material";
import { ISavedList } from "interfaces";
import { Field, Fields } from "types";
import { useState } from "react";

export const SavedListFields = {
  name: "name",
  color: "color",
};

export type SavedListForm = {
  [key: string]: any;
  name: string;
  color: string;
};

export const SavedListInitialState: SavedListForm = {
  name: "",
  color: "",
};

type Props = {
  savedList: ISavedList | null;
  onSubmit: (savedList: ISavedList) => void;
};

export const SavedList = ({ savedList, ...props }: Props) => {
  const { theme } = useTheme();
  const { lead } = useService();
  const { t, setFeedback } = useApp();

  const [fields, setFields] = useState<Fields>({
    [SavedListFields.name]: {
      validates: {
        [Enums.EnumValidation.Required]: {
          message: t.message.validation.required,
        },
      },
    } as Field,
    [SavedListFields.color]: {
      validates: {
        [Enums.EnumValidation.Required]: {
          message: t.message.validation.required,
        },
      },
    },
  });

  const { onChange, onValidate, onSubmit, values } = useForm<SavedListForm>(
    { ...SavedListInitialState, ...savedList } as SavedListForm,
    undefined,
    submitCallback
  );

  async function submitCallback() {
    const { isValid, response } = onValidate(fields);
    setFields(response);
    if (isValid) {
      const { status, payload } = await lead.manageSavedList(
        values as ISavedList
      );
      if (status === Enums.EnumResponse.Success) {
        const newSavedList =
          typeof payload === "string"
            ? ({
                id: payload,
                hidden: false,
                markers: [],
                ...values,
              } as ISavedList)
            : (values as ISavedList);
        props.onSubmit && props.onSubmit(newSavedList);
      } else {
        setFeedback({
          message: t.message.auth.wrong_credentials,
          severity: Enums.EnumFeedback.Error,
        });
      }
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container mt={theme.spacing.sm} gap={theme.spacing.sm}>
        <Grid item xs={12}>
          <Custom.TextField
            name={SavedListFields.name}
            value={values.name}
            onChange={onChange}
            label={t.label.name}
            helperText={
              fields[SavedListFields.name].error
                ? fields[SavedListFields.name].errorText
                : undefined
            }
            error={fields[SavedListFields.name].error}
          />
        </Grid>
        <Grid item xs={12}>
          <Input.Color
            name={SavedListFields.color}
            value={values.color}
            onChange={onChange}
            label={t.label.main_color}
            helperText={
              fields[SavedListFields.color].error
                ? fields[SavedListFields.color].errorText
                : fields[SavedListFields.color].helperText
            }
            error={fields[SavedListFields.color].error}
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" mt={theme.spacing.md}>
        <Custom.Button submit>{t.action.submit}</Custom.Button>
      </Stack>
    </Box>
  );
};

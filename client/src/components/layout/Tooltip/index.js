import { Tooltip as TooltipMaterial } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useCallback } from 'react';

const Tooltip = ({ theme = "default", cssCustom, children, ...rest }) => {
    const style = useCallback((theme) => ({
        light: {
            arrow: {
                backgroundColor: theme.palette.common.white,
            },
            tooltip: {
                backgroundColor: theme.palette.common.white,
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: theme.shadows[1],
                fontSize: 11,
            },
            fab: {
                margin: theme.spacing(2),
            },
            absolute: {
                position: 'absolute',
                bottom: theme.spacing(2),
                right: theme.spacing(3),
            },
            // button: {
            //     margin: theme.spacing(1),
            // },
            // customWidth: {
            //     maxWidth: 500,
            // },
            // noMaxWidth: {
            //     maxWidth: 'none',
            // },
            ...cssCustom
        },
        bootstrap: {
            arrow: {
                color: theme.palette.common.black,
            },
            tooltip: {
                backgroundColor: theme.palette.common.black,
            },
            ...cssCustom
        },
        default: {
            ...cssCustom
        }
    }), [cssCustom]);
    // disabled
    // interactive
    // disableFocusListener
    // disableHoverListener
    // disableTouchListener
    // open={open} onClose={handleClose} onOpen={handleOpen}
    const CustomTooltip = withStyles((t) => style(t)[theme]||style(t)["default"])(TooltipMaterial);
    return <CustomTooltip  {...rest}>
        {children || <></>}
    </CustomTooltip>
}

export default Tooltip;

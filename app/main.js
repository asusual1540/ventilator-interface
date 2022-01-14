let pressure_chart = new render_pressure_chart()
let volume_chart = new render_volume_chart()
let flow_chart = new render_flow_chart()



let pressure_data = []
let volume_data = []
let flow_data = []



let chunk_size = 360
let pres_total_angle = 100
let vol_total_angle = 180
let flow_total_angle = 360
function push_random_data(array) {
    let counter = -1
    let pres_angle = -1
    let vol_angle = -1
    let flow_angle = -1
    setInterval(function () {
        ++counter
        ++pres_angle
        vol_angle += 2
        flow_angle += 5
        if (counter > chunk_size) {
            counter = 0
        }
        if (pres_angle > pres_total_angle) {
            pres_angle = 0
        }
        if (vol_angle > vol_total_angle) {
            vol_angle = 0
        }
        if (flow_angle > flow_total_angle) {
            flow_angle = 0
        }
       
        
        let press_amp = 30
        let vol_amp = 800
        let flow_amp = 100
        pressure_data.splice(counter, 1, (Math.sin(pres_angle * Math.PI/180) * press_amp))
        volume_data.splice(counter, 1, (Math.sin(vol_angle * Math.PI / 180) * vol_amp))
        flow_data.splice(counter, 1, (Math.sin(flow_angle * Math.PI / 180) * flow_amp))

    }, 10)
}


push_random_data(pressure_data)
push_random_data(volume_data)
push_random_data(flow_data)

let counter = -1
setInterval(function () {
    ++counter
    if (counter >= chunk_size) {
        counter = 0
    }
    let y = pressure_data[counter]
    pressure_chart.add_data(y);
    y = volume_data[counter]
    volume_chart.add_data(y);
    y = flow_data[counter]
    flow_chart.add_data(y);

}, 20);

// let pressure_data = []
// let volume_data = []
// let flow_data = []


let COLOR_PRIMARY = "rgb(154, 56, 240)"
let COLOR_ACTIVE = "rgb(0, 255, 0)"
let COLOR_INACTIVE = "rgb(0, 0, 255)"
let COLOR_MILD_WARNING = "rgb(255, 255, 0)"
let COLOR_HIGH_WARNING = "rgb(255, 40, 0)"



// let last_pressure = 0;
// let next_state_expanding = true;
// function update_data(data) {

//     data = data.trim();
//     let json_data = {}
//     if (data.startsWith('pp')) {
//         let str_list = data.split(':');
//         if (!isNaN(str_list[1]))
//             json_data['pplat'] = Number(str_list[1]).toFixed(0);
//         if (!isNaN(str_list[2]))
//             json_data['cstat'] = Number(str_list[2]).toFixed(0);
//     }
//     else if (data.startsWith('vtie')) {
//         let str_list = data.split(':');
//         if (!isNaN(str_list[1]))
//             json_data['vti'] = str_list[1];
//         if (!isNaN(str_list[2]))
//             json_data['vte'] = str_list[2];
//     }
//     else if (data.startsWith('err')) {
//         let str_list = data.split(':');
//         if (!isNaN(str_list[1]))
//             json_data['err'] = str_list[1];

//     }
//     else if (data.startsWith('pip')) {
//         let str_list = data.split(':');
//         if (!isNaN(str_list[1]))
//             json_data['pip'] = Number(str_list[1]).toFixed(0);
//     }
//     else if (data.startsWith('peep')) {
//         let str_list = data.split(':');
//         if (!isNaN(str_list[1]))
//             json_data['peep'] = Number(str_list[1]).toFixed(0);
//     }
//     else if (data.startsWith('pf')) {
//         let str_list = data.split(':');
//         if (!isNaN(str_list[1]))
//             json_data['pif'] = Number(str_list[1]).toFixed(0);
//         if (!isNaN(str_list[1]))
//             json_data['pef'] = Number(str_list[2]).toFixed(0);
//     }
//     else if (data.startsWith('dt')) {
//         let str_list = data.split(':');
//         if (str_list.length < 5)
//             return;
//         if (!isNaN(str_list[3]))
//             json_data['f'] = str_list[3];
//         else
//             return;
//         if (!isNaN(str_list[2]))
//             json_data['v'] = str_list[2];
//         else
//             return;
//         if (!isNaN(str_list[1]))
//             json_data['p'] = str_list[1];
//         else
//             return;
//     }

//     let _data = json_data
//     for (let key in _data) {
//         let value = _data[key]
//         value = value.trim();
//         if (key == 'f') {
//             flow_chart.add_data(value)
//         }
//         else if (key == 'p') {
//             pressure_chart.add_data(value)
//             if (last_pressure - value >= 2) {
//                 last_pressure = value;
//                 if (next_state_expanding == true) {
//                     shrink_lungs();
//                     next_state_expanding = false;
//                 }

//             }
//             else if (last_pressure - value <= -5) {
//                 last_pressure = value;
//                 if (next_state_expanding == false) {
//                     expand_lungs();
//                     next_state_expanding = true;
//                 }

//             }

//         }
//         else if (key == 'v') {
//             volume_chart.add_data(value);
//         }
//         else if (key == 'err') {
//             if (value == 1) {

//                 set_ventilator_status("Minute Volume is not achievable", COLOR_PRIMARY, COLOR_MILD_WARNING);

//                 window.ventilator.play_tone("sound_warning.mp3");
//                 setTimeout(function () {
//                     set_ventilator_status("Ventilator is active now", COLOR_PRIMARY, COLOR_ACTIVE);
//                 }, 5000)
//             }
//             if (value == 2) {

//                 set_ventilator_status("Patient is disconnected", COLOR_PRIMARY, COLOR_HIGH_WARNING);
//                 window.ventilator.play_tone("sound_error.mp3");
//                 setTimeout(function () {
//                     set_ventilator_status("Ventilator is idle now", COLOR_PRIMARY, COLOR_INACTIVE);
//                 }, 5000)
//             }
//             if (value == 3) {

//                 set_ventilator_status("Flow sensor disconnected");
//                 window.ventilator.play_tone("sound_error.mp3");
//                 setTimeout(function () {
//                     set_ventilator_status("Ventilator is active now", COLOR_PRIMARY, COLOR_INACTIVE);
//                 }, 15000)
//             }
//         }
//         else if (key == 'pplat') {
//             $('#pplat_value').text(value);
//             window.ventilator.play_tone("sound_success.mp3");
//         }
//         else if (key == 'cstat') {
//             $('#cstat_value').text(value);
//         }
//         else if (key == 'vti') {
//             // $('#vti_value').text(value);
//             set_value('#vti_value', value)
//         }
//         else if (key == 'vte') {
//             // $('#vte_value').text(value);
//             set_value('#vte_value', value)
//         }
//         else if (key == 'pip') {
//             // $('#vte_value').text(value);
//             set_value('#pip_value', value)
//         }
//         else if (key == 'peep') {
//             // $('#vte_value').text(value);
//             set_value('#peep_value', value)
//         }
//         else if (key == 'pif') {
//             // $('#vte_value').text(value);
//             set_value('#pif_value', value)
//         }
//         else if (key == 'pef') {
//             // $('#vte_value').text(value);
//             set_value('#pef_value', value)
//         }
//         else {
//             // $(`#${key}`).text(value)
//         }
//     }
// }

function set_ventilator_status(status, color_1, color_2) {
    $("[param=status]").text(status);
    clearInterval(FLASH_INTERVAL)
    flash_status(color_1, color_2)
}


function set_value(element_id, value) {
    let prev_text = $(element_id).text();
    let input_value = "-", output_value = "-";
    if (prev_text.includes("/")) {
        input_value = prev_text.split("/")[1];
    } else {
        $(element_id).text(value);
        return
    }
    output_value = `${value}/${input_value}`;
    $(element_id).text(output_value);
    return
}



$(document).ready(function () {
    // set status
    set_ventilator_status("Ventilator is idle now.", COLOR_PRIMARY, COLOR_INACTIVE)

})

$(document).ready(function () {
    // setTimeout(function () {
    //     window.ventilator.send_commands("hi")
    // }, 1000)
    remove_all_dials()
    hide_confirmation_modal()

    $('.action').bind("tap click", function () {
        // document.getElementById('player').play()
        let current_command = $(".current_action_text").text()
        show_modal("50%", "40%", false)
        hide_modes()
        hide_parameter()
        remove_all_dials()
        show_cancel_button("action")
        show_confirm_button("action")
        hide_back_button("action")


        if (current_command === "Start") {
            show_confirmation_modal("Are you sure to start the ventilator?")
        } else if (current_command === "Stop") {
            show_confirmation_modal("Are you sure to stop the ventilator?")
        }
    })


    $('.settings').bind("tap click", function () {
        remove_all_dials()
        show_modal("70%", "85%", true)
        $(".modal_title p").text("Select Ventilation/Operation Mode")
        show_modes()
        hide_parameter()
        hide_confirmation_modal()
        show_cancel_button("control")
    })

    $('#cancel').bind("click tap", function () {
        $(".mode_select_button").removeAttr("selected")
        hide_modal()
        hide_parameter()
        hide_modes()
        remove_all_dials()
    })


    $(".mode_select_button").bind("tap click", function () {
        let mode_name = $(this).text()
        let mode = $(this).attr("m")
        $(this).attr("selected", 1)
        $(".this_mode").text(mode_name)
        $(".modal_title p").text(mode_name)
        hide_modes()
        show_parameter()
        switch (mode) {
            case "1": // VC_CMV
                remove_all_dials()
                show_dial('rr_range', 6, 30, 1, 15)
                show_dial('ie_range', 1, 4, .1, 2)
                show_dial('P_range', 0, 60, 1, 20)
                show_dial('vti_range', 25, 1000, 25, 400)
                show_dial('p_range', 0, 20, 1, 0)
                break
            case "2": // VC_SIMV
                remove_all_dials()
                show_dial('rr_range', 6, 30, 1, 15)
                show_dial('ie_range', 1, 4, .1, 2)
                show_dial('P_range', 0, 60, 1, 20)
                show_dial('vti_range', 25, 1000, 25, 400)
                show_dial('p_range', 0, 20, 1, 0)
                break
            case "3": // PSV

                break
            case "4": // PC_CMV
                remove_all_dials()
                show_dial('rr_range', 6, 30, 1, 15)
                show_dial('ie_range', 1, 4, .1, 2)
                show_dial('P_range', 0, 60, 1, 20)
                show_dial('p_range', 0, 20, 1, 0)
                break
            case "5": // PC_SIMV
                remove_all_dials()
                show_dial('rr_range', 6, 30, 1, 15)
                show_dial('ie_range', 1, 4, .1, 2)
                show_dial('P_range', 0, 60, 1, 20)
                show_dial('p_range', 0, 20, 1, 0)
                break
            case "6": // PRVC

                break
            case "7": // CPAP

                break
            case "8": // BIPAP

                break
            case "c": // Calibrate

                break
            default:

        }
        show_back_button("control")
        show_cancel_button("control")
        show_confirm_button("control")
        // show_dial('p_range', 0, 20, 1, 0)   peep
        // show_dial('P_range', 0, 60, 1, 20)   pip
        // show_dial('fio2_range', 21, 100, 1, 21)   fio2
        // show_dial('vti_range', 100, 800, 1, 400)   vti
        // show_dial('rr_range', 0, 60, 1, 15)   rr
        // show_dial('ie_range', 0, 4, .1, 2)   ie
        // show_dial('pif_range', 0, 100, 1)   pif
        // show_dial('h_range', 0, 80, 1, 50)   h
    })

    $("#back").bind("click tap", function () {
        $(".mode_select_button").removeAttr("selected")
        hide_back_button('control')
        show_cancel_button('control')
        hide_confirm_button("control")
        $(".modal_title p").text(`Select Ventilation/Operation Mode`)
        show_modes()
        hide_parameter()
        hide_confirmation_modal()
        remove_all_dials()
    })





    $("#confirm").bind("tap click", function () {
        let data = {}
        hide_modal()
        hide_modes()
        hide_parameter()
        hide_confirmation_modal()

        let confirmation_state = $(this).attr("from")

        if (confirmation_state === "control" || confirmation_state === "configurable") {
            let parameter_shown = $("[parameter_shown]")
            parameter_shown.each(function () {
                let class_name = $(this).children().attr("class").split(" ")[1]
                let value = $(`.${class_name} .info .count`).text()
                let attr_name = class_name.split("_")[0]
                let v = get_input_value(value)
                if (class_name === "ie_range") {
                    let prev_val = $(`div[param=${attr_name}]`).text()
                    let val_output = prev_val.split("/")[0]
                    $(`div[param=${attr_name}]`).text(`${val_output}/1:${v}`)
                }
                else if (class_name === "ramp_range") {
                    $(`div[param=${attr_name}]`).text(v)
                }
                else {
                    let prev_val = $(`div[param=${attr_name}]`).text()
                    let val_output = prev_val.split("/")[0]
                    $(`div[param=${attr_name}]`).text(`${val_output}/${v}`)
                }
                data[`${attr_name}`] = Number(v)
            })
            remove_all_dials()
            hide_parameter()
        }

        else if (confirmation_state === "action") {
            let current_command = $(".current_action_text").text()
            if (current_command === "Start") {
                set_ventilator_status("Ventilator is active now.", COLOR_PRIMARY, COLOR_ACTIVE)
                window.ventilator.send_commands("svs:2")
                $(".action img").attr("src", "./pause.svg")
                $(".action").css("background-color", "#ff2800")
                $(".current_action_text").text("Stop")
            } else if (current_command === "Stop") {
                set_ventilator_status("Ventilator is idle now.", COLOR_PRIMARY, COLOR_ACTIVE)
                window.ventilator.send_commands("svs:1")
                $(".action img").attr("src", "./start.svg")
                $(".action").css("background-color", "rgb(57, 170, 95)")
                $(".current_action_text").text("Start")
            } else {
            }
        } else {
        }

        let mode = $(`[selected="selected"]`).attr("m")

        window.ventilator.send_commands(`smode:${mode}`)

        let number_of_param = Object.keys(data).length
        let counter = 0
        let cmd_interval = setInterval(function () {

            if (counter === number_of_param) {
                clearInterval(cmd_interval)
            }
            else {
                let key = `${Object.keys(data)[counter]}`
                let value = data[key]
                let formatted_string = `s${key}:${value},`
                window.ventilator.send_commands(formatted_string)
            }
            counter++
        }, 10)

    })

    $(`[configurable=true]`).bind("click tap", function () {
        let gh = $(this).attr("class")
        let parameter_name = ""
        if (gh === "info_item") {
            parameter_name = $(this).children(":first").text()
        } else {
            parameter_name = $(this).children(":last").text()
        }

        remove_all_dials()
        hide_modes()
        hide_confirmation_modal()
        $(".parameter_options").css("justify-content", "center")
        let parameter = $(this).attr("id")

        let value = $(`[param=${parameter}]`).text()
        if (value.includes("/")) {
            value = value.split("/")[1]
            if (!value) {
                value = 0
            } else if (value.includes(":")) {
                value = Number(value.split(":")[1])
            }
        }
        switch (parameter) {
            case "p":
                remove_all_dials()
                show_dial('p_range', 0, 20, 1, value)
                break
            case "P":
                remove_all_dials()
                show_dial('P_range', 0, 60, 1, value)
                break
            case "fio2":
                remove_all_dials()
                show_dial('fio2_range', 21, 100, 1, value)
                break
            case "vti":
                remove_all_dials()
                show_dial('vti_range', 25, 1000, 25, value)
                break
            case "rr":
                remove_all_dials()
                show_dial('rr_range', 6, 30, 1, value)
                break
            case "ie":
                remove_all_dials()
                show_dial('ie_range', 1, 4, .1, value)
                break
            case "pif":
                remove_all_dials()
                show_dial('pif_range', 0, 100, 1, value)
                break
            case "h":
                remove_all_dials()
                show_dial('h_range', 0, 80, 1, value)
                break
            case "pplat":
                remove_all_dials()
                show_dial('pplat_range', 15, 35, 1, value)
                break
            case "ramp":
                remove_all_dials()
                show_dial('ramp_range', 5, 60, 1, value)
                break
            default:
        }
        let previous_parameter_value = $(`[param=${parameter}]`).text()
        if (previous_parameter_value.includes("/")) {
            let value_output = previous_parameter_value.split("/")[0]
            let value_input = previous_parameter_value.split("/")[1]
            $(`.${parameter}_range .info .count`).text(`${value_input}`)
        }
        else {
            $(`.${parameter}_range .info .count`).text(`${previous_parameter_value}`)
        }
        show_modal("60%", "60%", true)
        $(".modal_title p").text(`Select ${parameter_name} Value`)
        hide_modes()
        show_parameter()
        hide_back_button("configurable")
        show_cancel_button("configurable")
        show_confirm_button("configurable")

    })
})

function set_left_side_value(parameter, value) {
    let text = $(`[param=${parameter}]`).text()
    let right_side
    if (text.includes("/")) {
        right_side = text.split("/")[1]
    }
    $(`[param=${parameter}]`).text(`${value}/${right_side}`)
}

function show_dial(element, minimum, maximum, step, default_value) {

    $(`.${element}`).parent().css("display", "flex")
    $(`.${element}`).parent().attr("parameter_shown", element)
    $(`.${`${element}`} input`).attr("min", minimum)
    $(`.${`${element}`} input`).attr("max", maximum)
    $(`.${`${element}`} input`).attr("step", step)


    const settings = {
        fill: '#56ab2f',
        background: '#d7dcdf'
    }

    $(`.${`${element}`} input`).val(default_value)
    $(`.${`${element}`} input`).trigger("input")

    apply_default_fill(element, default_value)

    $(`.${`${element}`} input`).on('input', (event) => {
        show_text(element, event.target.value)
        let current_value = Number(event.target.value)
        $(`.${`${element}`} input`).attr("value", current_value)
        apply_fill(event.target)
    })

    function show_text(element, value) {
        if (element === "ie_range") {
            $(`.${`${element}`} .info .count`).text(`1:${value}`)
        } else {
            $(`.${`${element}`} .info .count`).text(`${value}`)
        }
    }



    function apply_fill(slider) {
        const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
        const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
        slider.style.background = bg;
    }

    function apply_default_fill(element, value) {
        let slider = $(`.${`${element}`} input`)
        show_text(element, value)
        slider.attr("value", value)
        const percentage = 100 * (value - slider.attr("min")) / (slider.attr("max") - slider.attr("min"));
        const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
        slider.css("background", bg)
    }
}


$(document).ready(function () {

    $(".minus_icon").on("click tap", function () {
        let element = $(this).parent().attr("class").split(" ")[1]
        let step = $(`.${element} input`).attr("step")
        apply_fill_on_click($(`.${`${element}`} input`), "decrement", step)
    })

    $(".plus_icon").on("click tap", function () {
        let element = $(this).parent().attr("class").split(" ")[1]
        let step = $(`.${element} input`).attr("step")
        apply_fill_on_click($(`.${`${element}`} input`), "increment", step)
    })
})


function apply_fill_on_click(slider, type, step_size) {
    const settings = {
        fill: '#56ab2f',
        background: '#d7dcdf'
    }
    let value = Number(slider.attr("value"))

    let next_value
    if (type === "increment") {
        next_value = value + Number(step_size)
    }
    else if (type === "decrement") {
        next_value = value - Number(step_size)
    } else {
        next_value = value
    }
    slider.val(next_value)
    slider.trigger("input")

    const percentage = 100 * (next_value - slider.min) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
    slider.css("background", bg)
}





// function show_dial(element, minimum, maximum, step, default_value) {
//     $(`.${element}`).parent().css("display", "flex")
//     $(`.${element}`).parent().attr("parameter_shown", element)
//     $(`.${`${element}`} input`).attr("min", minimum)
//     $(`.${`${element}`} input`).attr("max", maximum)
//     if (step != 1) {
//         $(`.${`${element}`} .info .count`).text(`1:${default_value}`)
//     }
//     let position,
//         lastPosition,
//         canSlide = false,
//         range = $(`.${element}`),
//         input = range.find("input"),
//         maxPoints = maximum,
//         minPoints = minimum,
//         prevVal = minimum
//     range.on("mousedown touchstart", rangeSliderInit)
//     range.on("mousemove touchmove", rangeSliderUpdate)
//     range.on("mouseup touchend", rangeSliderStop)
//     function pointerEvents(e) {
//         let pos = { x: 0, y: 0 }
//         if (
//             e.type == "touchstart" ||
//             e.type == "touchmove" ||
//             e.type == "touchend" ||
//             e.type == "touchcancel"
//         ) {
//             let touch = e.changedTouches[0]
//             pos.x = touch.pageX
//             pos.y = touch.pageY
//         }
//         else if (
//             e.type == "mousedown" ||
//             e.type == "mouseup" ||
//             e.type == "mousemove" ||
//             e.type == "mouseover" ||
//             e.type == "mouseout" ||
//             e.type == "mouseenter" ||
//             e.type == "mouseleave"
//         ) {
//             pos.x = e.pageX
//             pos.y = e.pageY
//         }
//         return pos
//     }
//     function rangeSliderInit() {
//         canSlide = true
//     }
//     let dial = range.find(".dial")
//     let diff = maximum - minimum
//     let deg = ((360 / diff) * Number(default_value)) - ((360 / diff) * Number(minimum))
//     let radius = range.width() / 2
//     let x = Math.ceil((radius - 5) * Math.sin(deg * Math.PI / 180)) + radius + "px"
//     let y = Math.ceil((radius - 5) * -Math.cos(deg * Math.PI / 180)) + radius + "px"
//     let points = Number(minPoints) + Math.ceil(deg * (maxPoints - minPoints) / 360)
//     dial.css({ transform: "translate(" + x + "," + y + ")" })
//     if (deg <= 180) {
//         range.find(".right .blocker").css({ transform: "rotate(" + deg + "deg)" })
//         range.find(".left .blocker").css({ transform: "rotate(0)" })
//     } else {
//         range.find(".right .blocker").css({ transform: "rotate(180deg" })
//         range
//             .find(".left .blocker")
//             .css({ transform: "rotate(" + (deg - 180) + "deg)" })
//     }
//     if (step == 1) {
//         range.find(".count").text(points)
//     } else {
//         range.find(".count").text(`1:${points}`)
//     }
//     function rangeSliderUpdate(e) {
//         if (!canSlide || maxPoints == 0) return
//         let position = pointerEvents(e),
//             dial = range.find(".dial"),
//             dialRadius = dial.width() / 2,
//             coords = {
//                 x: position.x - range.offset().left,
//                 y: position.y - range.offset().top
//             },
//             radius = range.width() / 2,
//             atan = Math.atan2(coords.x - radius, coords.y - radius), // angle in the plane in radian
//             deg = Math.ceil(-atan / (Math.PI / 180) + 180) // angle in the plane in degree

//         if (prevVal <= 1 && lastPosition - position.x >= 0) deg = 0
//         if (prevVal >= 359 && lastPosition - position.x <= 0) deg = 360
//         let x, y, points
//         if (step == 1) {
//             x = Math.ceil((radius - 5) * Math.sin(deg * Math.PI / 180)) + radius + "px"
//             y = Math.ceil((radius - 5) * -Math.cos(deg * Math.PI / 180)) + radius + "px"
//             points = Number(minPoints) + Math.ceil(deg * (maxPoints - minPoints) / 360)
//         }
//         else {
//             x = Math.ceil((radius - 5) * Math.sin(deg * Math.PI / 180)) + radius + "px"
//             y = Math.ceil((radius - 5) * -Math.cos(deg * Math.PI / 180)) + radius + "px"
//             points = +(Number(minPoints) + (+(deg * (maxPoints - minPoints) / 360).toFixed(1)))
//         }
//         //move dial
//         dial.css({ transform: "translate(" + x + "," + y + ")" })
//         //show range progress
//         if (deg <= 180) {
//             range.find(".right .blocker").css({ transform: "rotate(" + deg + "deg)" })
//             range.find(".left .blocker").css({ transform: "rotate(0)" })
//         } else {
//             range.find(".right .blocker").css({ transform: "rotate(180deg" })
//             range
//                 .find(".left .blocker")
//                 .css({ transform: "rotate(" + (deg - 180) + "deg)" })
//         }
//         //show value
//         if (step == 1) {
//             range.find(".count").text(points)
//         } else {
//             range.find(".count").text(`1:${points}`)
//         }
//         prevVal = deg
//         lastPosition = position.x
//     }
//     function rangeSliderStop() {
//         canSlide = false
//     }
// }








function shrink_lungs() {
    $("#left_lung").css("transform", "scale(0.95, 0.95)")
    $("#right_lung").css("transform", "scale(0.95, 0.95)")
    $(".st0").css("fill", "#fff")
}
function expand_lungs() {
    $("#left_lung").css("transform", "scale(1.14, 1.14)")
    $("#right_lung").css("transform", "scale(1.14, 1.14)")
    $(".st0").css("fill", "#6dc9f7")
}

function get_input_value(text) {
    let inp_val = ""
    if (text.includes("/")) {
        inp_val = text.split("/")[1]
    }
    else if (text.includes(":")) {
        inp_val = text.split(":")[1]
    } else {
        inp_val = text
    }
    return inp_val
}


function get_formatted_string_state(parameters) {
    // parameters = ['P', 'vti', 'rr', 'ie']
    let string_state = ''
    parameters.map(function (v) {
        let value = $(`div[param=${v}]`).text()
        value = get_input_value(value)
        return string_state += `${v}:${value},`
    })
    return string_state
}


function show_output(full_text, value) {
    let output = full_text.split('/')[0]
    let input = full_text.split('/')[1]

    return `${value}/${input}`
}
function show_input(full_text, value) {
    let output = full_text.split('/')[0]
    let input = full_text.split('/')[1]

    return `${output}/${value}`
}

function remove_all_dials() {
    $(".parameter").css("display", "none")
    $(".parameter").removeAttr("parameter_shown")
}

function show_modal(width, height, title) {
    $('#modal-container').removeAttr('class').addClass("show")
    $('body').addClass('modal-active')
    $(".modal").css("height", height)
    $(".modal").css("width", width)
    if (!title) {
        $(".modal_title").css("display", "none")
    } else {
        $(".modal_title").css("display", "flex")
    }
}

function hide_modal() {
    $('#modal-container').addClass('out')
    $('body').removeClass('modal-active')
}

function show_modes() {
    $(".mode_options").css("display", 'flex')
}
function hide_modes() {
    $(".mode_options").css("display", 'none')
}

function hide_parameter() {
    $(".parameter_options").css("display", 'none')
}
function show_parameter() {
    $(".parameter_options").css("display", 'flex')
}
function hide_confirmation_modal() {
    $(".confirmation").css("display", 'none')
    $(".confirmation p").text("")
}
function show_confirmation_modal(text) {
    $(".confirmation").css("display", 'flex')
    $(".confirmation p").text(text)
}

function show_confirm_button(from) {
    $("#confirm").css('display', 'inline-block')
    $("#confirm").attr('from', from)
}
function hide_confirm_button() {
    $("#confirm").css('display', 'none')
    $("#confirm").attr('from', "")
}
function show_cancel_button(from) {
    $("#cancel").css('display', 'inline-block')
    $("#cancel").attr('from', from)
}
function hide_cancel_button() {
    $("#cancel").css('display', 'none')
    $("#cancel").attr('from', "")
}

function show_back_button(from) {
    $("#back").css('display', 'inline-block')
    $("#back").attr('from', from)
}
function hide_back_button(from) {
    $("#back").css('display', 'none')
    $("#back").attr('from', "")
}

let FLASH_INTERVAL

function flash_status(color_primary, color_secondary) {
    let flashed = false
    FLASH_INTERVAL = setInterval(function () {
        if (flashed) {
            $(".current_status").css("background", color_primary)
            flashed = false
        } else {
            $(".current_status").css("background", color_secondary)
            flashed = true
        }

    }, 1000)
}












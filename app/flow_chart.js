function render_flow_chart(w, h) {

    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    }

    var x_index = 0;
    var width = (w * 0.68) - margin.left - margin.right;
    var height = (h * 0.38) - margin.top - margin.bottom;
    var data = [];
    var x = d3.scaleLinear().domain([0, width]).range([0, width]);
    var y = d3.scaleLinear().domain([-height, height]).range([height, 0]);
    var count = 0;
    var line_to_draw;

    var x_axis = d3.axisBottom().scale(x)
        .ticks(6)
        .tickFormat(function (d, i) {
            if (d == 0) {
                return ''
            } else {
                let custom_d = Math.round(d / 28.8);
                return `${custom_d}`
            }
        })
        .tickSize(6)
        .tickSizeInner([6])


    var y_axis = d3.axisLeft().scale(y)
        .ticks(5);

    var value_line = d3.line()
        .curve(d3.curveBundle.beta(1))
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y(d.y);
        });

    var svg = d3.select("#flow_chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Render two slip paths. One will be drawn as the other is wiped. To create the wipe effect, I simply reduce the size of the clip path and translate it.
    var clip_path_5 = svg.append("defs")
        .append("clipPath")
        .attr("id", "clip5");

    var clip_path_6 = svg.append("defs")
        .append("clipPath")
        .attr("id", "clip6");

    var clip_rect_1 = clip_path_5.append("rect")
        .attr("x", 0)
        .attr("width", 0)
        .attr("height", height);

    var clip_rect_2 = clip_path_6.append("rect")
        .attr("x", 0)
        .attr("width", 0)
        .attr("height", height);

    // Append two paths. One path will be used to draw on while the other will be the previously drawn path.
    var path_1 = svg.append("g")
        .append("path") // Add the value_line path.
        .attr("class", "line1")
        .attr("clip-path", "url(#clip5)")
        .data([data])
        .attr("d", value_line)
        .attr('stroke', '#66ff00')

    var path_2 = svg.append("g")
        .append("path")
        .attr("clip-path", "url(#clip6)")// Add the value_line path.
        .data([data])
        .attr("class", "line2")
        .attr("d", value_line)
        .attr('stroke', '#66ff00')

    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }
    svg.append("g")
        .attr("class", "grid_y")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )

    // Add the x and y axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height / 2 + ")")
        .call(x_axis);

    svg.append("g")
        .attr("class", "y axis")
        .call(y_axis);



    this.add_data = function (y) {
        var point = {
            x: x_index,
            y: y
        };
        data.push(point);
        x_index++;

        if (data.length > width) {
            count++;
            x_index = 0;
            data = []
            if (line_to_draw !== undefined) {
                if (line_to_draw === ".line1") {
                    clip_rect_2.attr("width", "0");
                    clip_rect_2.attr("transform", "translate(0, 0)");
                }
                else {
                    clip_rect_1.attr("width", "0");
                    clip_rect_1.attr("transform", "translate(0, 0)");
                }
            }
        }


        line_to_draw = count % 2 === 0 ? ".line1" : ".line2";

        var increment = x(data.length);
        var newWidth = width - increment;

        if (line_to_draw === ".line1") {
            clip_rect_1.attr("width", increment);
            clip_rect_2.attr("width", newWidth);
            clip_rect_2.attr("transform", "translate(" + increment + ", 0)");
        }
        else {
            clip_rect_2.attr("width", increment);
            clip_rect_1.attr("width", newWidth);
            clip_rect_1.attr("transform", "translate(" + increment + ", 0)");
        }

        svg.select(line_to_draw)
            .data([data])
            .attr("d", value_line);

    }


}




function doLogin() {
    localStorage.setItem("email", $("#email").val());
    localStorage.setItem("password", $("#password").val());
    $("#email, #password").val("");
    loginFromLocalStorage();
}

function loginFromLocalStorage() {
    const req = $.post({
        url: "/api/login.php",
        contentType: "text/plain",
        data: JSON.stringify({
            email: localStorage.getItem("email"),
            password: wp.encSync(localStorage.getItem("password"), "hex"),
            time: parseInt(new Date() / 1000),
            s: "W0RFXVN0ZXZlIGxpa2VzIGJpZyBidXR0cw==", // signature of some kind
            lang: "en",
            date: 1501230947855458660, // ???
            ClientType: "webui",
            PS: "W0RFXVN0ZXZlIGxpa2VzIGJpZyBidXR0cw==" // anti-cheat data
        })
    });
    req.done(data => {
        if (single.getCurrentPath() == "/webui/") {
            single.loadRoute("/webui/inventory");
        }
        $(".displayname").text(data.DisplayName);
        window.accountId = data.id;
        window.authz = "accountId=" + data.id + "&nonce=" + data.Nonce;
        updateInventory();
    });
    req.fail(() => {
        logout();
        alert("Login failed");
    });
}

function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
}

if (localStorage.getItem("email") && localStorage.getItem("password")) {
    loginFromLocalStorage();
}

single.on("route_load", function (event) {
    if (event.route.paths[0] != "/webui/") {
        // Authorised route?
        if (!localStorage.getItem("email")) {
            // Not logged in?
            return single.loadRoute("/webui/"); // Show login screen
        }
        $("body").addClass("logged-in");
    } else {
        $("body").removeClass("logged-in");
    }
});

window.itemListPromise = new Promise(resolve => {
    const req = $.get("/custom/getItemLists");
    req.done(data => {
        const itemMap = {};
        for (const [type, items] of Object.entries(data)) {
            items.forEach(item => {
                const option = document.createElement("option");
                option.setAttribute("data-key", item.uniqueName);
                option.value = item.name;
                document.getElementById("datalist-" + type).appendChild(option);
                itemMap[item.uniqueName] = { ...item, type };
            });
        }
        resolve(itemMap);
    });
});

function updateInventory() {
    const req = $.get("/api/inventory.php?" + window.authz);
    req.done(data => {
        window.itemListPromise.then(itemMap => {
            document.getElementById("warframe-list").innerHTML = "";
            data.Suits.forEach(item => {
                const tr = document.createElement("tr");
                {
                    const td = document.createElement("td");
                    td.textContent = itemMap[item.ItemType]?.name ?? item.ItemType;
                    tr.appendChild(td);
                }
                {
                    const td = document.createElement("td");
                    td.classList = "text-end";
                    if (item.XP < 1_600_000) {
                        const a = document.createElement("a");
                        a.href = "#";
                        a.onclick = function (event) {
                            event.preventDefault();
                            addGearExp("Suits", item.ItemId.$oid, 1_600_000 - item.XP);
                        };
                        a.textContent = "Make Rank 30";
                        td.appendChild(a);

                        const span = document.createElement("span");
                        span.innerHTML = " &middot; ";
                        td.appendChild(span);
                    }
                    {
                        const a = document.createElement("a");
                        a.href = "#";
                        a.onclick = function (event) {
                            event.preventDefault();
                            disposeOfGear("Suits", item.ItemId.$oid);
                        };
                        a.textContent = "Remove";
                        td.appendChild(a);
                    }
                    tr.appendChild(td);
                }
                document.getElementById("warframe-list").appendChild(tr);
            });

            document.getElementById("weapon-list").innerHTML = "";
            ["LongGuns", "Pistols", "Melee"].forEach(category => {
                data[category].forEach(item => {
                    const tr = document.createElement("tr");
                    {
                        const td = document.createElement("td");
                        td.textContent = itemMap[item.ItemType]?.name ?? item.ItemType;
                        tr.appendChild(td);
                    }
                    {
                        const td = document.createElement("td");
                        td.classList = "text-end";
                        if (item.XP < 800_000) {
                            const a = document.createElement("a");
                            a.href = "#";
                            a.onclick = function (event) {
                                event.preventDefault();
                                addGearExp(category, item.ItemId.$oid, 800_000 - item.XP);
                            };
                            a.textContent = "Make Rank 30";
                            td.appendChild(a);

                            const span = document.createElement("span");
                            span.innerHTML = " &middot; ";
                            td.appendChild(span);
                        }
                        {
                            const a = document.createElement("a");
                            a.href = "#";
                            a.onclick = function (event) {
                                event.preventDefault();
                                disposeOfGear(category, item.ItemId.$oid);
                            };
                            a.textContent = "Remove";
                            td.appendChild(a);
                        }
                        tr.appendChild(td);
                    }
                    document.getElementById("weapon-list").appendChild(tr);
                });
            });
        });
    });
}

function getKey(input) {
    return document
        .getElementById(input.getAttribute("list"))
        .querySelector("[value='" + input.value.split("'").join("\\'") + "']")
        ?.getAttribute("data-key");
}

function doAcquireWarframe() {
    const uniqueName = getKey(document.getElementById("warframe-to-acquire"));
    if (!uniqueName) {
        $("#warframe-to-acquire").addClass("is-invalid").focus();
        return;
    }
    const req = $.post({
        url: "/custom/addItem",
        contentType: "application/json",
        data: JSON.stringify({
            type: "Powersuit",
            internalName: uniqueName,
            accountId: window.accountId
        })
    });
    req.done(() => {
        document.getElementById("warframe-to-acquire").value = "";
        updateInventory();
    });
}

$("#warframe-to-acquire").on("input", () => {
    $("#warframe-to-acquire").removeClass("is-invalid");
});

function doAcquireWeapon() {
    const uniqueName = getKey(document.getElementById("weapon-to-acquire"));
    if (!uniqueName) {
        $("#weapon-to-acquire").addClass("is-invalid").focus();
        return;
    }
    const req = $.post({
        url: "/custom/addItem",
        contentType: "application/json",
        data: JSON.stringify({
            type: "Weapon",
            internalName: uniqueName,
            accountId: window.accountId
        })
    });
    req.done(() => {
        document.getElementById("weapon-to-acquire").value = "";
        updateInventory();
    });
}

$("#weapon-to-acquire").on("input", () => {
    $("#weapon-to-acquire").removeClass("is-invalid");
});

function addGearExp(category, oid, xp) {
    const data = {};
    data[category] = [
        {
            ItemId: { $oid: oid },
            XP: xp
        }
    ];
    $.post({
        url: "/api/missionInventoryUpdate.php?" + window.authz,
        contentType: "text/plain",
        data: JSON.stringify(data)
    }).done(function () {
        updateInventory();
    });
}

function disposeOfGear(category, oid) {
    const data = {
        SellCurrency: "SC_RegularCredits",
        SellPrice: 0,
        Items: {}
    };
    data.Items[category] = [
        {
            String: oid
        }
    ];
    $.post({
        url: "/api/sell.php?" + window.authz,
        contentType: "text/plain",
        data: JSON.stringify(data)
    }).done(function () {
        updateInventory();
    });
}

function doAcquireMiscItems() {
    const uniqueName = getKey(document.getElementById("miscitem-type"));
    if (!uniqueName) {
        $("#miscitem-type").addClass("is-invalid").focus();
        return;
    }
    $.post({
        url: "/api/missionInventoryUpdate.php?" + window.authz,
        contentType: "text/plain",
        data: JSON.stringify({
            MiscItems: [
                {
                    ItemType: uniqueName,
                    ItemCount: $("#miscitem-count").val()
                }
            ]
        })
    }).done(function () {
        alert("Successfully added.");
    });
}

$("#miscitem-name").on("input", () => {
    $("#miscitem-name").removeClass("is-invalid");
});
